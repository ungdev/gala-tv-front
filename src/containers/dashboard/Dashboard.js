import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import Layout from './layout'
import Home from './pages/Home'
import Events from './pages/Events'
import Artists from './pages/Artists'
import Messages from './pages/Messages'
import Partners from './pages/Partners'
import UsersManagement from './pages/UserManagement'
import ValidateUser from './pages/ValidateUser'
import { startSocketIO } from '../../modules/socketio'

const baseUrl = process.env.REACT_APP_BASEURL + 'admin'

class Dashboard extends React.Component {
  render() {
    if (!this.props.user) return <Spin />
    const { admin } = this.props.user
    const component = (
      <Switch>
        <Route path={baseUrl} exact component={Home} />

        {/* ADMIN ONLY ROUTES */}
        {admin && (
          <React.Fragment>
            <Route path={baseUrl + '/events'} exact component={Events} />
            <Route path={baseUrl + '/artists'} exact component={Artists} />
            <Route path={baseUrl + '/partners'} exact component={Partners} />
            <Route path={baseUrl + '/messages'} exact component={Messages} />
            <Route
              path={baseUrl + '/users'}
              exact
              component={UsersManagement}
            />
            <Route
              path={baseUrl + '/users/setadmin'}
              component={ValidateUser}
            />
          </React.Fragment>
        )}

        <Redirect from='*' to={baseUrl} />
      </Switch>
    )

    return <Layout component={component} />
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
