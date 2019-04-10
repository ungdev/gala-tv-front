import React from 'react'
import './home.css'
import Time from './components/Time'

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <Time />
      </div>
    )
  }
}

export default Home
