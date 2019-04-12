import React from 'react'
import { connect } from 'react-redux'
import './messages.css'

class Messages extends React.Component {
  render() {
    const messages = this.props.messages
      .filter(m => m.visible)
      .map(m => <span style={{ margin: '0 100px' }}>{m.content}</span>)
    return (
      <div className='messages'>
        <marquee className='messages-scroll' scrollamount='20'>
          {messages}
        </marquee>
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
