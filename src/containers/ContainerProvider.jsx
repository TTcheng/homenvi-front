import React from 'react'
import {connect, Provider} from "react-redux";

import {fetchUser} from '../redux/actions'
import Workspace from '../components/workspace/Workspace'
import store from '../redux/store'

const WorkspaceCom = connect(
  (state) => ({user: state}),
  {fetchUser}
)(Workspace);


export const WorkspaceProvider = () => (
  <Provider store={store}>
    <WorkspaceCom/>
  </Provider>
);