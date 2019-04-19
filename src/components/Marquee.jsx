import React from 'react'
import './styles/marquee.css'

class Marquee extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 0,
      textWidth: 0,
      marqueeWidth: 0
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      const { width, marqueeWidth } = this.state
      let position = this.state.position - 5
      if (marqueeWidth < width && -position > width / 2) {
        this.setState({ position: width / 2 + position })
        return
      }
      if (-position > width) this.setState({ position: marqueeWidth })
      else this.setState({ position })
    }, 20)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const messages = this.props.children

    return (
      <div
        className='custom-marquee'
        ref={el => {
          if (!el) return
          if (this.state.marqueeWidth === el.getBoundingClientRect().width)
            return
          this.setState({
            marqueeWidth: el.getBoundingClientRect().width,
            position: el.getBoundingClientRect().width
          })
        }}
      >
        <span
          style={{ left: this.state.position }}
          ref={el => {
            if (!el) return
            if (this.state.width === el.getBoundingClientRect().width) return
            this.setState({ width: el.getBoundingClientRect().width })
          }}
        >
          {messages}
          {this.state.marqueeWidth < this.state.width && messages}
        </span>
      </div>
    )
  }
}

export default Marquee
