import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { push } from 'react-router-redux'
import { actions as notifActions } from 'redux-notifications'
import { fetchUser, SET_USER } from './user'

export const SET_TOKEN = 'login/SET_TOKEN'

const initialState = {
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}

export const autoLogin = () => {
  return async dispatch => {
    if (localStorage.hasOwnProperty('flute-token')) {
      dispatch({
        type: SET_TOKEN,
        payload: localStorage.getItem('flute-token')
      })

      return dispatch(fetchUser())
    } else {
      return dispatch(logout())
    }
  }
}

export const tryLogin = user => {
  return async dispatch => {
    try {
      const res = await axios.put('user/login', user)

      dispatch(saveToken(res.data.token))
      dispatch(push('/dashboard/home'))
      dispatch(
        notifActions.notifSend({
          message: 'Connexion validée',
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

export const saveToken = token => {
  return async dispatch => {
    dispatch({
      type: SET_TOKEN,
      payload: token
    })

    localStorage.setItem('flute-token', token)
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: SET_TOKEN, payload: null })
    dispatch({ type: SET_USER, payload: null })

    localStorage.removeItem('flute-token')

    return dispatch(push('/'))
  }
}
