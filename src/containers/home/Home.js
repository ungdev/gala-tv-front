import React from 'react'
import './home.css'
import Time from './components/Time'
import Partners from './components/Partners'
import logo from '../../assets/logo.png'
import { connect } from 'react-redux'
import { startSocketIO } from '../../modules/socketio'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.props.startSocketIO()
  }
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
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startSocketIO: () => dispatch(startSocketIO())
})

export default connect(
  null,
  mapDispatchToProps
)(Home)
