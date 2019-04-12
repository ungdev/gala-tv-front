import React from 'react'
import { connect } from 'react-redux'
import './styles/home.css'
import { Button } from 'antd'
import { request } from '../../../modules/user'
import AdminHome from './AdminHome'

class Home extends React.Component {
  render() {
    const { admin } = this.props.user
    if (admin) return <AdminHome/>
    return (
      <div className='home-container'>
        <h1>Vous n'êtes pas administrateur</h1>
        <p>
          Vous pouvez demander à avoir accès aux droits en appuyant sur ce
          boutton :
        </p>
        <Button type='primary' onClick={this.props.request}>
          Demander des droits administrateurs
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  request: () => dispatch(request())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
