import React, {Component} from 'react';
import mui, {Tabs, Tab} from 'material-ui';

export default class RequestTab extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTab: 'request',
      tabsContent: {}
    }

    this.tabs = ['request', 'request body', 'response', 'response body'];
  }

  componentWillMount () {
    this.handleTabActive(this.state.currentTab);
  }

  handleTabsChange (value) {
    this.setState({
      currentTab: value
    });
  }

  handleTabActive (tabKey) {
    let key = tabKey.replace(/\s/g, '-');
    fetch(`/7layer/${this.props.username}/${key}`)
      .then( (res) => {
        return res.json()
      }).then( (data) => {
        let tabsContent = this.state.tabsContent;
        tabsContent[tabKey] = JSON.stringify(data);
        this.setState({tabsContent: tabsContent});
      }).catch((ex) => {
        console.error('parsing failed', ex);
        tabsContent[tabKey] = '返回错误数据';
        this.setState({tabsContent: tabsContent})
      });
  }

  render () {
    let tabs = this.tabs.map((item, index)=>{
      return (
        <Tab label={item} key={index} value={item} 
          onActive={this.handleTabActive.bind(this, item)}>
          <div style={styles.tabContent}>
            {this.state.tabsContent[item]}
          </div>
        </Tab>
      )
    });
    return (
      <Tabs inkBarStyle={{backgroundColor: "#fff59d"}} 
        valueLink={{value: this.state.currentTab, requestChange: this.handleTabsChange.bind(this)}}>
        {tabs}
      </Tabs>
    )
  }
}

let styles = {
  tabContent: {
    padding: '20px'
  }
}
