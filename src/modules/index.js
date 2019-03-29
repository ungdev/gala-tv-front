import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import canLogin from './canLogin'
import login from './login'
import register from './register'
import user from './user'
import payment from './payment'
import forgot from './forgot'
import admin from './admin'
import validate from './validate'
import bedrooms from './bedrooms'
import teams from './teams'
import prices from './prices'
import tinder from './tinder'
import target from './target'
import displays from './displays'

export default combineReducers({
    routing: routerReducer,
    notifs: notificationsReducer,
    canLogin,
    login,
    register,
    user,
    payment,
    forgot,
    admin,
    validate,
    bedrooms,
    teams,
    prices,
    tinder,
    target,
    displays,
})
