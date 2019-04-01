import React from 'react'
import { connect } from 'react-redux'
import { saveToken } from '../../modules/login'

class Return extends React.Component {
  constructor(props) {
    super(props)
    this.checkLogin()
  }
  checkLogin = () => {
    const { location } = this.props
    if (
      location.search.split('?token=') &&
      location.search.split('?token=')[1]
    ) {
      const token = location.search.split('?token=')[1]
      this.props.saveToken(token)
    }
  }
  render() {
    return <div>You are going to be redirected</div>
  }
}


const mapDispatchToProps = dispatch => ({
  saveToken: token => dispatch(saveToken(token))
})

export default connect(
  null,
  mapDispatchToProps
)(Return)
