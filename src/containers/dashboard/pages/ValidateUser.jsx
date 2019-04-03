import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { setAdmin } from '../../../modules/admin'

class Home extends React.Component {
  constructor(props) {
    super(props)
    props.setAdmin(this.props.location.search.split('?id=')[1])
  }
  render() {
    return <Redirect from='*' to={'/admin/users'} />
  }
}

const mapDispatchToProps = dispatch => ({
  setAdmin: id => dispatch(setAdmin(id))
})

export default connect(
  null,
  mapDispatchToProps
)(Home)
