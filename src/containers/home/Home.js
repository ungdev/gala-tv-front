import React from 'react'
import './home.css'
import Time from './components/Time'
import Partners from './components/Partners'
import Messages from './components/Messages'
import logo from '../../assets/logo.png'

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <div className='home-left'>
          <div className='home-logo'>
            <img src={logo} alt='' />
          </div>
          <Partners />
        </div>
        <div className='home-middle'>
          <Time />
        </div>
        <div className='home-right' />
        <div className='home-footer'>
          <Messages />
        </div>
      </div>
    )
  }
}

export default Home
