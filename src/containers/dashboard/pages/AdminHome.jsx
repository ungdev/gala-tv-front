import React from 'react'
import { connect } from 'react-redux'
import './styles/home.css'
import { editTweet } from '../../../modules/tweet'
import HomeTwitterList from './components/HomeTwitterList'
import HomeMessageList from './components/HomeMessageList'
import HomeEventList from './components/HomeEventList'
import Censoreds from './Censoreds'
import Notifications from './Notifications'

class AdminHome extends React.Component {
  render() {
    return (
      <div className='admin-container'>
        <HomeTwitterList />
        <HomeEventList />
        <div style={{ width: '49%' }}>
          <div style={{ marginTop: '20px' }}>
            <Censoreds />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Notifications />
          </div>
        </div>
        <div style={{ marginTop: '20px', width: '49%' }}>
          <HomeMessageList />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  tweets: state.socketio.tweets
})

const mapDispatchToProps = dispatch => ({
  editTweet: (id, params) => dispatch(editTweet(id, params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHome)
