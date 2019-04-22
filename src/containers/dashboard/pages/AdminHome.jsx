import React from 'react'
import { connect } from 'react-redux'
import './styles/home.css'
import { editTweet } from '../../../modules/tweet'
import HomeTwitterList from './components/HomeTwitterList'
import HomeMessageList from './components/HomeMessageList'
import HomeEventList from './components/HomeEventList'
import Censoreds from './Censoreds'

class AdminHome extends React.Component {
  render() {
    return (
      <div className='admin-container'>
        <HomeTwitterList />
        <HomeEventList />
        <Censoreds style={{ marginTop: '20px' }} width='49%' />
        <HomeMessageList />
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
