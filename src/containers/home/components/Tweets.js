import React from 'react'
import { connect } from 'react-redux'
import './tweets.css'
import moment from 'moment'

class Tweets extends React.Component {
  render() {
    const tweets = this.props.tweets.filter(m => m.visible)
    return (
      <div className='tweets'>
        {tweets.map(tweet => (
          <div className='tweet' key={tweet.id}>
            <span className='tweet-from'>
              De @{tweet.user} à {moment(tweet.createdAt).format('HH:mm')} :
            </span>
            <span className='tweet-text'>
              {tweet.text.length > 100
                ? tweet.text.substr(0, 100) + '...'
                : tweet.text}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tweets: state.socketio.tweets
})

export default connect(
  mapStateToProps,
  null
)(Tweets)
