import React from 'react'
import { connect } from 'react-redux'
import './messages.css'
import Marquee from '../../../components/Marquee'

class Messages extends React.Component {
  render() {
    const messages = this.props.messages
      .filter(m => m.visible)
      .map((m, i) => <span key={i} style={{ margin: '0 100px' }}>{m.content}</span>)
    return (
      <div className='messages'>
        <Marquee>{messages}</Marquee>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.socketio.messages
})

export default connect(
  mapStateToProps,
  null
)(Messages)
