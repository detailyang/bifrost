import 'normalize.css';
import React, {Component} from 'react';
import mui, {AppBar, FlatButton} from 'material-ui';
import ListArea from './list_area';
import RequestTab from './request_tab';
import ApplyDialog from './apply_dialog';
import 'whatwg-fetch/fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MyRawTheme from './themes';
const ThemeManager = require('material-ui/lib/styles/theme-manager');

injectTapEventPlugin();

export default React.createClass({
  getInitialState () {
    return {
      selectUser: null,
      showDialog: false
    }
  },

  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
    };
  },

  render () {
    return (
      <div>
        <AppBar title="Bifrost" iconElementRight={<FlatButton label="Apply" onTouchTap={this.openApplyDialog}/>} />
        <div style={styles.content}>
          <div style={styles.listWrap}>
            <ListArea onSelectUser={this.onSelectUser}/>
          </div>
          {
            this.state.selectUser ?  (
              <div style={styles.sideWrap}>
                <RequestTab username={this.state.selectUser}/>
              </div>
            ) : null
          }
        </div>
        <ApplyDialog showDialog={this.state.showDialog} closeApplyDialog={this.closeApplyDialog}/>
      </div>
    )
  },

  onSelectUser (user) {
    this.setState({
      selectUser: user
    });
  },

  openApplyDialog () {
    this.setState({showDialog: true})
  },

  closeApplyDialog (isButton) {
    isButton && this.setState({showDialog: false})
  }
})


let styles = {
  listWrap: {
    width: '260px'
  },
  sideWrap: {
    flex: 1,
    padding: '20px'
  },
  content: {
    display: 'flex',
    padding: '10px'
  }
}