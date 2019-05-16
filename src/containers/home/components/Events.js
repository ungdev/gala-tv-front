import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import './styles/events.css'
import EventHorizontal from './EventHorizontal'
import EventVertical from './EventVertical'

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
  render() {
    let { events } = this.props
    events = events
      .filter(event => !moment().isAfter(event.end)) // remove finished events
      .sort((a, b) => {
        //sort by start date
        if (moment(a.start).isAfter(b.start)) return 1
        if (moment(a.start).isBefore(b.start)) return -1
        return 0
      })
      .splice(0, 3)
    return (
      <div className='home-events'>
        <h1>Prochains événements</h1>
        <div className='events-container'>
          {events.map(event =>
            this.props.horizontal ? (
              <EventHorizontal event={event} key={event.id} />
            ) : (
              <EventVertical event={event} key={event.id} />
            )
          )}
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
