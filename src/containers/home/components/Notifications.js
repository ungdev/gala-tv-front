import React from 'react'
import { connect } from 'react-redux'
import './styles/notifications.css'

class Notifications extends React.Component {
  render() {
    if (!this.props.notification) return null
    return (
      <div className='notifications'>
        <div className='notifications-container'>
          <h1 className='notification-title'>
            {this.props.notification.title}
          </h1>
          <h2 className='notification-content'>
            {this.props.notification.content}
          </h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notification: state.socketio.notification
})

export default connect(
  mapStateToProps,
  null
)(Notifications)
