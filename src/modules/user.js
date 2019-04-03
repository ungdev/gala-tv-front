import axios from '../lib/axios'
import { logout } from './login'
import moment from 'moment'
import { actions as notifActions } from 'redux-notifications'
import errorToString from '../lib/errorToString'

export const SET_USER = 'user/SET_USER'

const initialState = {
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {
          ...action.payload,
          admin: action.payload.permissions.findIndex(p => p === 'admin') !== -1
        }
      }

    default:
      return state
  }
}

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('user', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_USER, payload: res.data })
    } catch (err) {
      dispatch(logout())
    }
  }
}

export const request = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.post(
        `request`,
        {},
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )

      dispatch(
        notifActions.notifSend({
          message:
            'Votre demande a été prise en compte, un administrateur va traiter votre demande',
          dismissAfter: 2000
        })
      )
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}
