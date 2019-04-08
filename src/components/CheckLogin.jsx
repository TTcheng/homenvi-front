import {Component} from "react";
import {withRouter} from "react-router-dom";

import {apis, pages} from "../config/route";
import {BaseConstants} from "../utils/Constants";

@withRouter
class CheckLogin extends Component {
  componentDidMount() {
    fetch(apis.checkLogin, {
      method: 'GET',
      headers: {
        'Authorization': sessionStorage.getItem(BaseConstants.Authorization) || '',
      }
    }).then(response => {
      if (response.status === 401) {
        this.props.history.push(pages.login)
      }
    });
  }

  render() {
    return null;
  }
}

export default CheckLogin;