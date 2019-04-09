import React, {Component} from 'react';
import NormalLogin from '../components/login/Login'
import './LoginApp.css';

class LoginApp extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NormalLogin className={"Login"}/>
        </header>
      </div>
    );
  }
}

export default LoginApp;
