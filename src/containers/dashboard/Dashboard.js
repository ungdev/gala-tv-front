import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import Layout from './layout'
import Home from './pages/Home'
import Events from './pages/Events'


const baseUrl = process.env.REACT_APP_BASEURL + 'admin'

class Dashboard extends React.Component {
  render() {
    const component = (
      <Switch>
        <Route path={baseUrl} exact component={Home} />
        <Route path={baseUrl + '/events'} exact component={Events} />
        <Redirect from='*' to='/admin' />
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
