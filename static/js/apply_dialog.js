import React, {Component} from 'react';
import mui, {Dialog, TextField, RadioButtonGroup, RadioButton} from 'material-ui';

export default class ApplyDialog extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      duration: 'day',
      username: '',
      token: null
    }
  }

  render () {
    let standardActions = [
      { text: 'Exit'},
      { text: 'Apply', 
        onTouchTap: this.onDialogSubmit.bind(this),
        ref: 'submit'
      }
    ];
    return (
      <Dialog
        title="申请 Token"
        actions={standardActions}
        actionFocus="submit"
        open={this.props.showDialog}
        onRequestClose={this.props.closeApplyDialog}>

        <TextField hintText="username" floatingLabelText="用户名" value={this.state.username} onChange={this.onUsernameChange.bind(this)} />
        <RadioButtonGroup name="duration" valueSelected={this.state.duration} style={styles.radioGroup} onChange={this.onDurationChange.bind(this)}>
          <RadioButton
            value="day"
            label="一天"
            style={styles.radio} />
          <RadioButton
            value="week"
            label="一星期"
            style={styles.radio} />
          <RadioButton
            value="month"
            label="一个月"
            style={styles.radio} />
        </RadioButtonGroup>
        
        {
          this.state.token ?
          <TextField hintText="token" floatingLabelText="Token" 
          disabled={false} rowsMax={3} value={this.state.token}
          style={styles.tokenField}/>
          : null
        }
        

      </Dialog>
    )
  }

  onDurationChange (e, selected) {
    this.setState({
      duration: selected
    })
  }

  onDialogSubmit () {
    let ttlMap = {
      day: 24 * 3600,
      week: 24 * 3600 * 7,
      month: 24 * 3600 * 30
    };
    let data = {
      ttl: ttlMap[this.state.duration],
      user: this.state.username
    };
    fetch('/token', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then( (res) => {
      return res.json()
    }).then( (data) => {
      this.setState({
        token: data.value
      });
    }).catch((ex) => {
      console.error('parsing failed', ex);
    });
  }

  onUsernameChange (e) {
    this.setState({
      username: e.target.value
    });
  }
}

let styles = {
  radioGroup: {
    marginTop: '25px'
  },
  radio: {
    marginBottom: '16px'
  },

  tokenField: {
    width: '400px',
    fontSize: '24px'
  }
}