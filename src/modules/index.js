import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import admin from './admin'
import artist from './artist'
import censored from './censored'
import event from './event'
import image from './image'
import login from './login'
import message from './message'
import notification from './notification'
import partner from './partner'
import socketio from './socketio'
import tweet from './tweet'
import user from './user'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  admin,
  artist,
  censored,
  event,
  image,
  login,
  message,
  notification,
  partner,
  socketio,
  tweet,
  user
})
