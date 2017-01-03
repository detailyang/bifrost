import React, {Component} from 'react';
import {List, ListItem} from 'material-ui';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';

let SelectableList = SelectableContainerEnhance(List);

export default class ListArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedIndex: null,
      loading: false
    };
  }
  
  componentWillMount () {
    this.setState({
      loading: true
    });
    fetch('/7layer')
      .then( (res) => {
        return res.json()
      }).then( (data) => {
        this.setState({
          items: data,
          loading: false
        });
      }).catch((ex) => {
        console.error('parsing failed', ex);
        this.setState({
          loading: false
        });
      });
  }

  handleUpdateSelectedIndex (e, index) {
    this.setState({selectedIndex: index});
    this.props.onSelectUser(this.state.items[index-1]);
  }

  render () {
    let listItems = this.state.loading
      ? <ListItem primaryText={'loading'} />
      : this.state.items.map((item, index)=>{
        return (<ListItem primaryText={item} key={index} value={index+1} />);
      });
    return (
      <SelectableList subheader="All Requests" 
        valueLink={{value: this.state.selectedIndex, 
          requestChange: this.handleUpdateSelectedIndex.bind(this)}}>
        {listItems}
      </SelectableList>
    );
  }
}