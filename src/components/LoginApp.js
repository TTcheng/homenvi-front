import React, {Component} from 'react';
import NormalLogin from './login/Login'
import './App.css';

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
