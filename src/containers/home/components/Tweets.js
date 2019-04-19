import React from 'react'
import { connect } from 'react-redux'
import './tweets.css'
import moment from 'moment'

class Tweets extends React.Component {
  replace = text => {
    this.props.censoreds.forEach(censored => {
      text = text.replace(censored.word, 'fraise')
    })
    return text
  }
  render() {
    const { censoreds } = this.props
    const tweets = this.props.tweets
      .filter(m => m.visible)
      .filter(
        t =>
          censoreds
            .filter(censored => censored.level > 0)
            .findIndex(
              censored =>
                t.text.toLowerCase().search(censored.word.toLowerCase()) !== -1
            ) === -1
      )

    return (
      <div className='tweets'>
        {tweets.map(tweet => (
          <div className='tweet' key={tweet.id}>
            <span className='tweet-from'>
              De @{tweet.user} à {moment(tweet.createdAt).format('HH:mm')} :
            </span>
            <span className='tweet-text'>
              {tweet.text.length > 100
                ? this.replace(tweet.text).substr(0, 100) + '...'
                : this.replace(tweet.text)}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tweets: state.socketio.tweets,
  censoreds: state.socketio.censoreds
})

export default connect(
  mapStateToProps,
  null
)(Tweets)
