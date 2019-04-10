import React from 'react'
import moment from 'moment'

export default () => (
  <div className='home-time'>
    <span>{moment().format('HH:mm')}</span>
  </div>
)
