import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Notifs as Notifications } from 'redux-notifications'
import 'antd/dist/antd.css'

import { autoLogin } from '../../modules/login'
import Home from '../home/Home'
import asyncComponent from '../../components/async'
import Return from '../login/Return'
import Login from '../login/Login'
const Dashboard = asyncComponent(() => import('../dashboard/Dashboard'))
class App extends React.Component {
  constructor(props) {
    super(props)
    props.autoLogin()
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Notifications />
        <Switch>
          <Route path={process.env.REACT_APP_BASEURL} exact component={Home} />
          <Route
            path={process.env.REACT_APP_BASEURL + 'login'}
            component={Return}
          />
          {this.props.token ? (
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
  }
}

const mapStateToProps = state => ({
  token: state.login.token
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
