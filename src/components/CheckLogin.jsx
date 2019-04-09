import {Component} from "react";
import {withRouter} from "react-router-dom";

import {routes} from "../config/routes";
import {authorize} from "../config/apis";
import {BaseConstants} from "../utils/Constants";

@withRouter
class CheckLogin extends Component {
  componentDidMount() {
    const {route, method} = authorize.checkLogin;
    fetch(route, {
      method,
      headers: {
        'Authorization': sessionStorage.getItem(BaseConstants.Authorization) || '',
      }
    }).then(response => {
      if (response.status === 401) {
        this.props.history.push(routes.login)
      }
    });
  }

  render() {
    return null;
  }
}

export default CheckLogin;