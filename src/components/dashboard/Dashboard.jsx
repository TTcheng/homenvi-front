import React, {Component} from 'react';
import * as PropTypes from 'prop-types';

import AxisChart from "../charts/AxisChart";


class Dashboard extends Component {
  render() {
    return (
      <div>
        <AxisChart/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // getDashboardData: PropTypes.func.isRequired,
};

export default Dashboard;