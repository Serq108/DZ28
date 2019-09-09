import React from 'react';
import LoginForm from './LoginForm'
import Logout from './Logout'
import RegForm from './RegForm'
import ProFile from './ProFile'

console.log('entry point');

const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const checkAuth = () => {
  fetch('acc/', {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
  }).then( ans => ans.json())
      .then((res) => {
        console.log(res);
        console.log(res.length);
      })
    .catch((error) => console.error('Ошибка:', error));
};

const logout = () => {
  fetch('api-auth/logout/', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
    },
  }).then((chck) => checkAuth())
      .catch((error) => console.error('Ошибка:', error));
};

const authPost = (data) => {
  fetch('api-auth/login/', {
    method: 'POST',
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrer: 'no-referrer', // no-referrer, *client
    body: data,
    // body: 'username=mihan&password=123'
  }).then( (res) => console.log(res))
    .catch((error) => console.error('Ошибка:', error));
};

const regPost = (data) => {
  fetch('reg/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer', // no-referrer, *client
    body: data
  }).then( ans => ans.text())
    .then( (res) => console.log(res))
    .catch((error) => console.error('Ошибка:', error));
};

export default class FormWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      uid: {},
      mod: 'login'
    }
    this.submitForm = this.submitForm.bind(this);
    this.submitLog = this.submitLog.bind(this);
    this.submitReg = this.submitReg.bind(this);
    this.submitProf = this.submitProf.bind(this);
    this.gotoReg = this.gotoReg.bind(this);
    this.gotoHome = this.gotoHome.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
  }
  getUid() {
    fetch('acc/', {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
    }).then(response => response.json())
    .then(res => {
      if(res.user_id === 'None'){
        console.log(res.user_id);
        this.setState({ mod: 'login'});
      }else{
        this.setState({ uid: res});
        this.setState({ mod: 'profile'});
        console.log('this.state.uid', this.state.uid);
      }
    });
  }
  authPost (data) {
    fetch('api-auth/login/', {
      method: 'POST',
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrer: 'no-referrer', // no-referrer, *client
      body: data,
      // body: 'username=mihan&password=123'
    }).then((res) => {
          this.setState({ mod: 'profile'});
        })
      .catch((error) => console.error('Ошибка:', error));
  }
  profUpdate(data,url){
    fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer', // no-referrer, *client
      body: data
    }).then( ans => ans.text())
      .then( (res) => console.log(res))
      .catch((error) => console.error('Ошибка:', error));
  }
  submitForm(eventData){
    console.log(eventData);
    let data = 'username' + '=' + eventData.username + 
      '&' + 'password' + '=' + eventData.password;
    console.log(data);
    this.authPost(data);
  }
  submitLog(eventData){
    console.log(eventData.logout);
    if(eventData.logout){
      logout();
    }
  }
  submitReg(eventData){
    console.log(JSON.stringify(eventData));
    let data = JSON.stringify(eventData);
    regPost(data);
  }
  submitProf(eventData){
    let bdate = {birthday: eventData.date};
    delete eventData.date;
    let data = JSON.stringify(eventData);
    let url = 'usersupdate/' + this.state.uid.user_id + '/';
    console.log('Prof', data, 'url', url);
    //let dataext = '{"birthday": "1989-02-13T00:00:00Z"}';
    let dataext = JSON.stringify(bdate);
    console.log('dataext', dataext);
    let urlext = 'acc/' + this.state.uid.user_id + '/';
    this.profUpdate(data, url);
    this.profUpdate(dataext, urlext);
  }
  gotoReg(){
    this.setState({ mod: 'reg'});
    console.log('this.state.mod', this.state.mod);
  }
  gotoHome(){
    this.setState({ mod: 'home'});
    console.log('this.state.mod', this.state.mod);
  }
  gotoLogin(){
    this.setState({ mod: 'login'});
    logout();
  }
  componentDidMount(){
    console.log('componentDidMount');
    this.getUid();
  }
  render(){
    if(this.state.mod === 'login') {
      return (
       <div className="form"> 
         <LoginForm submit={this.submitForm} goto={this.gotoReg}></LoginForm>
       </div>
      )
    }
    if (this.state.mod === 'reg') {
      return (
        <div className="form"> 
          <RegForm submit={this.submitReg} goto={this.gotoLogin}></RegForm>
        </div>
      )
    }
    if (this.state.mod === 'profile') {
      return (
        <div className="form">
          <ProFile submit={this.submitProf} goto={this.gotoLogin} uid={this.state.uid}></ProFile>
        </div>
      )
    }
  }
}
         /*<Logout submit={this.submitLog}></Logout>*/
