import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Notifs as Notifications } from 'redux-notifications'
import 'antd/dist/antd.css'

import Home from '../home'
import asyncComponent from '../../components/async'

const Dashboard = asyncComponent(() => import('../dashboard/Dashboard'))
const Login = asyncComponent(() => import('../login/Login'))
const App = props => (
  <div style={{ height: '100%' }}>
    <Notifications />
    <Switch>
      <Route path={process.env.REACT_APP_BASEURL} exact component={Home} />
      {props.auth ? (
        <Route
          path={process.env.REACT_APP_BASEURL + 'admin'}
          component={Dashboard}
        />
      ) : (
        <Route
          path={process.env.REACT_APP_BASEURL + 'admin'}
          component={Login}
        />
      )}
      <Redirect from='*' to='/' />
    </Switch>
  </div>
)

const mapStateToProps = state => ({
  auth: state.user.user
})

export default connect(mapStateToProps)(App)
