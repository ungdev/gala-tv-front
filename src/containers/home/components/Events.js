import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import './styles/events.css'

class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment().format()
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  }
  tick() {
    this.setState({
      date: moment().format()
    })
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  getTime(time) {
    const m = moment(time)
    if (m.isBefore()) return 'En ce moment'
    return 'À ' + m.format('HH[h]mm')
  }
  render() {
    let { events } = this.props
    console.log(events)
    events = events
      .filter(event => !moment().isAfter(event.end)) // remove finished events
      .sort((a, b) => {
        //sort by start date
        if (moment(a.start).isAfter(b.start)) return 1
        if (moment(a.start).isBefore(b.start)) return -1
        return 0
      })
      .splice(0, 3)
    console.log(events)
    return (
      <div className='home-events'>
        <h1>Prochains événements :</h1>
        <div className='events-container'>
          {events.map(event => (
            <div key={event.id} className='event-main'>
              <div className='event-image'>
                <img src={process.env.REACT_APP_API + event.image} alt='' />
              </div>
              <div className='event-informations'>
                <span>{this.getTime(event.start)}</span>
                <span>{event.place}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.socketio.events
})

export default connect(
  mapStateToProps,
  null
)(Events)
