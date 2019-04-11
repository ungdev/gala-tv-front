import { push } from 'react-router-redux'
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
    if (localStorage.hasOwnProperty('tv-token')) {
      dispatch({
        type: SET_TOKEN,
        payload: localStorage.getItem('tv-token')
      })
      dispatch(fetchUser())

      return dispatch(fetchUser())
    } else {
      return dispatch(logout())
    }
  }
}

export const saveToken = token => {
  return async dispatch => {
    dispatch({
      type: SET_TOKEN,
      payload: token
    })

    localStorage.setItem('tv-token', token)
    dispatch(fetchUser())
    dispatch(push('/admin'))
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: SET_TOKEN, payload: null })
    dispatch({ type: SET_USER, payload: null })

    localStorage.removeItem('tv-token')

  }
}
