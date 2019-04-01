import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import login from './login'
import user from './user'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  login,
  user
})
