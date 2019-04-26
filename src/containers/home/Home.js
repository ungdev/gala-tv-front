import React from 'react'
import HomeHorizontal from './HomeHorizontal'
import HomeVertical from './HomeVertical'

class Home extends React.Component {
  render() {
    if (window.innerWidth > window.innerHeight) return <HomeHorizontal />
    else return <HomeVertical />
  }
}

export default Home
