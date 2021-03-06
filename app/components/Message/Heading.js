import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Tune from '@material-ui/icons/Tune';
import Help from '@material-ui/icons/Help';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { calendarStringsHeader } from '../../helper/time';
import route from '../../config/route';
import PhotoSmall from '../User/PhotoSmall';

const styles = ({
  icon: {
    margin: 0,
  },
  button: {
    margin: 0,
    padding: 5,
  },
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class Heading extends React.Component {
  state = {
    anchorEl: null,
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  showMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  editSettings = () => {
    location.href = route.URL_SETTINGS;
  };

  logout = () => {
    location.href = route.URL_LOGOUT;
  };

  viewMyProfile = () => {
    const { me } = this.props;

    window.open(
      `${route.URL_PROFILE}/${me.id}`,
      '_blank',
    );
  };

  viewHelp = () => {
    location.href = route.URL_HELP;
  };

  render() {
    const { selected, classes } = this.props;
    const { anchorEl } = this.state;

    if (!selected.name) {
      return '';
    }

    return (
      <div className="heading">
        <PhotoSmall user={selected.users[0]} />

        <div className="name">
          {selected.name}
          <p className="activeAt">
            <Moment
              calendar={calendarStringsHeader}
              date={selected.lastMessage.timestamp}
            />
          </p>
        </div>

        <Menu
          id="profileMenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.viewMyProfile}>
            <ListItemIcon className={classes.icon}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Profile" />
          </MenuItem>
          <MenuItem onClick={this.editSettings}>
            <ListItemIcon className={classes.icon}>
              <Tune />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Settings" />
          </MenuItem>
          <MenuItem onClick={this.viewHelp}>
            <ListItemIcon className={classes.icon}>
              <Help />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Help" />
          </MenuItem>
          <MenuItem onClick={this.logout}>
            <ListItemIcon className={classes.icon}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Sign Out" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

Heading.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object,
  me: PropTypes.object.isRequired,
};
Heading.defaultProps = {
  selected: {
    id: null,
  },
};

function mapStateToProps(state) {
  return {
    collection: state.room.collection,
    selected: state.room.selected,
    me: state.user.me,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Heading));

