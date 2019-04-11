import React from 'react'
import { connect } from 'react-redux'

class Partners extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.launchInterval()
  }
  launchInterval = () => {
    this.interval = setInterval(() => {
      let { current } = this.state
      current++
      if (this.props.partners && current >= this.props.partners.length) {
        this.setState({ current: 0 })
      } else {
        this.setState({ current })
      }
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    if (!this.props.partners || this.props.partners.length === 0) return <div />
    return (
      <div className='partners'>
        <div className='partners-container'>
          <div className='partners-image'>
            <img
              src={
                process.env.REACT_APP_API +
                this.props.partners[this.state.current].image
              }
              alt=''
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  partners: state.socketio.partners
})

export default connect(
  mapStateToProps,
  null
)(Partners)
