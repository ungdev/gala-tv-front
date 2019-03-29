import React from 'react'

import Layout from './layout'

class Dashboard extends React.Component {
  render() {
    const component = <div>Admin connected</div>
    return <Layout component={component} />
  }
}

export default Dashboard
