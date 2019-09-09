import React from 'react';
import './Login.css';

export default class Logout extends React.Component {
  constructor(props){
    super(props);
    this.state = {logout: false}
    this.submitLog = this.submitLog.bind(this);
  }
  submitLog(){
    //debugger
    console.log(this.state.logout);
    this.setState({ logout: true })
    this.props.submit({ logout: this.state.logout });
  }
  render(){
    return (
      <div className="login-form">
        <input type="submit" value="logout" onClick={this.submitLog}/>
      </div>
    )
  }
}
