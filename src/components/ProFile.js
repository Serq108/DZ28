import React from 'react';
//import DatePicker from 'react-date-picker/dist/entry.nostyle';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './ProFile.css';
//import PropTypes from "prop-types";

export default class ProFile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name: 'Fire',
      last_name: 'Fox',
      email: 'sd@sd.sd',
      date: new Date(),
      formDate: '1970-01-01'
    }
    this.handleChangeFname = this.handleChangeFname.bind(this);
    this.handleChangeLname = this.handleChangeLname.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(date){
    this.setState({ date: date});
    let sdtm = moment(date).format('DD/MM/YYYY');
    this.setState({ formDate: sdtm});
  }
  handleChangeFname(event){
    this.setState({ first_name: event.target.value})
  }
  handleChangeLname(event){
    this.setState({ last_name: event.target.value})
  }
  handleChangeEmail(event){
    this.setState({ email: event.target.value})
  }
  submitForm(){
    this.props.submit({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      date: this.state.date
    });
  }
  gotoLogin(){
    this.props.goto();
  }
  logout(){
    fetch('api-auth/logout/', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
        console.log(res);
        console.log(res.length);
      })
      .catch((error) => console.error('Ошибка:', error));
};
  render(){
    return (
      <div className="reg-form">
        <h1>User Profile</h1>
        <input ref={(fname) => this._input = fname} type="text" placeholder={this.props.uid.first_name} onChange={this.handleChangeFname}/>
        <input ref={(lname) => this._input = lname} type="text" placeholder={this.props.uid.last_name} onChange={this.handleChangeLname}/>
        <input ref={(mail) => this._input = mail} type="text" placeholder={this.props.uid.email} onChange={this.handleChangeEmail}/>
        
        <DatePicker  type="text" placeholder={this.state.date} onChange={this.onChange} value={this.state.formDate}/>
        <input type="submit" value="Send" onClick={this.submitForm}/>
        <div className="reg-link"  onClick={this.gotoLogin}>Logout</div>
      </div>
    )
  }
}
