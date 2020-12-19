import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import {
  Button, Dialog, FormGroup, Input, Typography,
} from '@material-ui/core';
import store from '../../store';

import Room from './Room';
import {
  createChat, loadRooms, selectRoom,
} from '../../services/room';
import { getUsers } from '../../services/user';
import { authorizeFailAction } from '../../store/actions/user';
import { loadMessages } from '../../services/message/loader';

const styles = ({
  List: {
    padding: 0,
    margin: 0,
  },
  ListItem: {
    padding: 0,
    margin: 0,
  },
});

class Rooms extends React.Component {
  state = {
    addChatPopupOpened: false,
    inputValue: '',
    error: {},
  };

  componentDidMount() {
    setTimeout(() => {
      loadRooms();
    }, 400);
  }

  onRoomClick = (event, room) => {
    selectRoom(room);
    loadMessages(room.id);
    console.log('room click');
  };

  onOpenPopup = () => {
    this.setState({
      addChatPopupOpened: true,
    });
  };

  onAddNewChatClick = async () => {
    if (this.state.inputValue.length === 0) {
      this.onError(new Error('Enter other user\'s name'));
      return;
    }
    try {
      const { data } = await getUsers();
      const otherUser = data.find(({ email }) => email === this.state.inputValue);
      await createChat(this.state.inputValue, [otherUser.id]);
      this.onClosePopup();
      loadRooms();
    } catch (e) {
      this.onError(new Error('User not found'));
    }
  };

  onInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  onClosePopup = () => {
    this.setState({ addChatPopupOpened: false });
  };

  onExitClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('centrifugeToken');
    localStorage.removeItem('name');

    store.dispatch(authorizeFailAction());
  };

  onError = (error) => {
    this.setState({
      error: {
        message: error.message,
      },
    });
  };

  renderDialog() {
    return (
      <Dialog open={this.state.addChatPopupOpened} onClose={this.onClosePopup}>
        <FormGroup className="new-chat-dialog">
          <Input
            type="text"
            placeholder="Enter user name you want to write to"
            onChange={this.onInputChange}
            value={this.state.inputValue}
          />
          <Button onClick={this.onAddNewChatClick}>
            Confirm
          </Button>
          {this.state.error && (
            <Typography color="error">
              {this.state.error.message}
            </Typography>
          )}
        </FormGroup>
      </Dialog>
    );
  }

  renderExit() {
    return (
      <Button onClick={this.onExitClick} variant="outlined" color="secondary" fullWidth>
        Exit
      </Button>
    );
  }

  render() {
    const {
      classes,
      collection,
      selected,
    } = this.props;

    if (collection.length === 0) {
      return (
        <aside id="rooms">
          {this.renderDialog()}
          <PeopleOutline className="noResults" />
          <Button fullWidth variant="contained" color="primary" onClick={this.onOpenPopup}>
            Add chat
          </Button>
          {this.renderExit()}
        </aside>
      );
    }

    return (<>
      <aside id="rooms">
        <div className="items">
          <List component="nav" className={classes.List}>
            {collection.map(room => (
              <ListItem
                key={room.name}
                button
                onClick={event => this.onRoomClick(event, room)}
                className={`userItem ${selected.id === room.id ? '__active' : ''} ${classes.ListItem}`}
              >
                <Room
                  room={room}
                />
              </ListItem>
            ))}
          </List>
          {this.renderDialog()}
          <Button fullWidth variant="contained" color="primary" onClick={this.onOpenPopup}>
            Add chat
          </Button>
          {this.renderExit()}
        </div>
      </aside>
    </>);
  }
}

Rooms.propTypes = {
  classes: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  selected: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
Rooms.defaultProps = {
  match: {},
  selected: {
    id: null,
  },
};

function mapStateToProps(state) {
  return {
    collection: state.room.collection,
    selected: state.room.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Rooms));
