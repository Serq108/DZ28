import React from 'react';
import './Login.css';
//import PropTypes from "prop-types";

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChangeLog = this.handleChangeLog.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.gotoReg = this.gotoReg.bind(this);
  }
  handleChangeLog(event){
    this.setState({ username: event.target.value})
  }
  handleChangePass(event){
    this.setState({ password: event.target.value})
  }
  submitForm(){
    //debugger
    console.log(this.state.username);
    console.log(this.state.password);
    this.props.submit({
      username: this.state.username,
      password: this.state.password
    });
  }
  gotoReg(){
    this.props.goto();
  }
  render(){
    return (
      <div className="login-form">
        <h1>Please Login </h1>
        <div className="reg-link"  onClick={this.gotoReg}>or register</div>
        <input ref={(log) => this._input = log} type="text" placeholder="Login" onChange={this.handleChangeLog}/>
        <input ref={(pass) => this._input = pass} type="password" name="password" placeholder="password" onChange={this.handleChangePass}/>
        <input type="submit" value="log in" onClick={this.submitForm}/>
      </div>
    )
  }
}
