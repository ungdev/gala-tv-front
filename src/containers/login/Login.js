import React from 'react'
import { connect } from 'react-redux'
import { saveToken } from '../../modules/login'
import { Button } from 'antd'
import './login.css'

class Login extends React.Component {
  login = () => {
    let { host, protocol } = window.location
    protocol = protocol.substring(0, protocol.length - 1)
    window.location = `${
      process.env.REACT_APP_API
    }/etuutt/url/${protocol}/${host}`
  }
  render() {
    return (
      <div className='login-container'>
        <Button size='large' type='primary' onClick={this.login}>
          Se connecter avec le site etu
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  saveToken: token => dispatch(saveToken(token))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
