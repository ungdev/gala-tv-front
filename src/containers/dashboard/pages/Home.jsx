import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
  render() {
    return (<div>Admin connected</div>)
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
