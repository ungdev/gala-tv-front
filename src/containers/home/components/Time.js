import React from 'react'
import moment from 'moment'

class Time extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment().format('HH:mm')
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  }
  tick() {
    this.setState({
      date: moment().format('HH:mm')
    })
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  render() {
    return (
      <div className='home-time'>
        <span>{this.state.date}</span>
      </div>
    )
  }
}

export default Time
