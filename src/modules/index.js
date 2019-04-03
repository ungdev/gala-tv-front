import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import artist from './artist'
import event from './event'
import image from './image'
import login from './login'
import user from './user'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  artist,
  event,
  image,
  login,
  user
})
