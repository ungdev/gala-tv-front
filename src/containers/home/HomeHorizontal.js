import React from 'react'
import './home.css'
import Time from './components/Time'
import Partners from './components/Partners'
import Events from './components/Events'
import Messages from './components/Messages'
import Tweets from './components/Tweets'
import logo from '../../assets/logo.png'
import Notifications from './components/Notifications'

class HomeHorizontal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='home home-horizontal'>
          <div className='home-left'>
            <div className='home-logo'>
              <img src={logo} alt='' />
            </div>
            <Partners />
          </div>
          <div className='home-middle'>
            <Time />
            <Events horizontal />
          </div>
        </div>
        <Notifications />
      </React.Fragment>
    )
  }
}

export default HomeHorizontal
