import {connect} from "react-redux";

import {fetchUser} from '../redux/actions'
import Workspace from '../components/workspace/Workspace'

export default connect(
  (state) => ({user: state}),
  {fetchUser}
)(Workspace)