import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import {WorkspaceProvider} from './containers/ContainerProvider';
import LoginApp from './components/LoginApp'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {pages} from "./config/route";
import CheckLogin from "./components/CheckLogin";

ReactDOM.render(<div>
  <BrowserRouter>
    <CheckLogin/>
    <Switch>
      <Route path={pages.index} component={WorkspaceProvider}/>
      <Route path={pages.login} component={LoginApp}/>
    </Switch>
  </BrowserRouter>
</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
