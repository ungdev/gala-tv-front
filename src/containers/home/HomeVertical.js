import React from 'react'
import './home-vertical.css'
import Time from './components/Time'
import Partners from './components/Partners'
import Events from './components/Events'
import Messages from './components/Messages'
import Tweets from './components/Tweets'
import logo from '../../assets/logo.png'
import twitter from './assets/twitter.png'
import Notifications from './components/Notifications'

class HomeVertical extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='home home-vertical'>
          <div className='home-top'>
            <div className='home-time-container'>
              <Time />
            </div>
            <div className='home-logo'>
              <img src={logo} alt='' />
            </div>
            <div className='home-partners'>
              <Partners />
            </div>
          </div>
          <div className='home-middle'>
            <Events />
            <div className='home-tweets'>
              <div className='tweets-title'>
                <img src={twitter} alt='' />
                <span>Vos tweets avec le #galautt2019</span>
              </div>
              <Tweets />
            </div>
          </div>
          <div className='home-footer'>
            <Messages />
          </div>
        </div>
        <Notifications />
      </React.Fragment>
    )
  }
}

export default HomeVertical
