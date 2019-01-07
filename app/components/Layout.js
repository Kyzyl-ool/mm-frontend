import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Users from './User/Users';
import Messages from './Message/Messages';

const styles = theme => ({
  tabsRoot: {
    height: 50,
    background: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  tabsIndicator: {
    background: '#43444f',
  },
  tabSelected: {
    background: '#43444f',
  },
  tabRoot: {
    color: '#43444f',
    marginTop: 1,
    marginRight: 0,
    minWidth: 110,
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Layout extends React.Component {
  state = {
    selectedTab: 0,
  };

  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div id="layout">
            <aside id="sideNav">
              <Tabs
                value={selectedTab}
                onChange={this.handleChange}
                classes={{
                  root: classes.tabsRoot,
                  indicator: classes.tabsIndicator,
                }}
              >
                <Tab
                  label="Profiles"
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  label="Properties"
                  disabled
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  label="Stories"
                  disabled
                  classes={{ root: classes.tabRoot }}
                />
              </Tabs>
              <Route component={Users} />
            </aside>
            <Route component={Messages} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
