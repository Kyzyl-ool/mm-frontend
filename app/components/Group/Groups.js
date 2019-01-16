import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import Group from './Group';
import Heading from './Heading';
import { selectUser, loadUsers } from '../../actions/user';
import { loadMessages } from '../../actions/message';

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

class Groups extends React.Component {
  componentDidMount() {
    loadUsers();
  }

  onUserClick = (event, user) => {
    selectUser(user);
    loadMessages(user.id);
  };

  render() {
    const {
      classes,
      collection,
      selected,
    } = this.props;

    if (collection.length === 0) {
      return (
        <aside id="users">
          <Heading />
          <PeopleOutline className="noResults" />
        </aside>
      );
    }

    return (
      <aside id="groups">
        <Heading />
        <div className="items">
          <List component="nav" className={classes.List}>
            {collection.map(user => (
              <ListItem
                key={user.name}
                button
                onClick={event => this.onUserClick(event, user)}
                className={`userItem ${selected.id === user.id ? '__active' : ''} ${classes.ListItem}`}
              >
                <Group
                  user={user}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </aside>
    );
  }
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
Groups.defaultProps = {
  match: {},
};

function mapStateToProps(state) {
  return {
    collection: state.user.collection,
    selected: state.user.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Groups));