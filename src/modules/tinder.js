import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_TINDERS = 'tinder/SET_TINDERS'
export const SET_USERS = 'tinder/SET_USERS'
export const SET_MATCHS = 'tinder/SET_MATCHS'
export const SET_MOST_LIKED = 'tinder/SET_MOST_LIKED'
export const SET_MOST_TURBOLIKED = 'tinder/SET_MOST_TURBOLIKED'
export const REMOVE_TINDER = 'tinder/REMOVE_TINDER'

const initialState = {
  tinders: [],
  users: [],
  matchs: [],
  mostLiked: [],
  mostTurboLiked: []
}

export default (state = initialState, action) => {
  let tinders = []
  switch (action.type) {
    case SET_TINDERS:
      return {
        ...state,
        tinders: action.payload
      }
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case SET_MATCHS:
      return {
        ...state,
        matchs: action.payload
      }
    case SET_MOST_LIKED:
      return {
        ...state,
        mostLiked: action.payload
      }
    case SET_MOST_TURBOLIKED:
      return {
        ...state,
        mostTurboLiked: action.payload
      }
    case REMOVE_TINDER:
      tinders = state.tinders.slice()
      tinders = tinders.filter(t => t.id !== action.payload)
      return {
        ...state,
        tinders
      }
    default:
      return state
  }
}

export const fetchTinders = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('tinders', {
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: SET_TINDERS, payload: res.data })
    } catch (err) {
      console.log(err)
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

export const fetchTinderUsers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('tinders/users', {
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: SET_USERS, payload: res.data })
    } catch (err) {
      console.log(err)
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
export const fetchTopTinders = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('tinders/top', {
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: SET_MOST_LIKED, payload: res.data.mostLiked })
      dispatch({ type: SET_MOST_TURBOLIKED, payload: res.data.mostTurboLiked })
    } catch (err) {
      console.log(err)
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
export const fetchMatchs = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('tinders/matchs', {
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: SET_MATCHS, payload: res.data })
    } catch (err) {
      console.log(err)
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
export const like = userId => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post(
        'tinders',
        { userId, type: 'like' },
        {
          headers: { 'X-Token': authToken }
        }
      )
      if (res.data === 'MATCH')
        dispatch(
          notifActions.notifSend({
            message: "C'est un match !",
            dismissAfter: 2000
          })
        )
      dispatch({ type: REMOVE_TINDER, payload: userId })
    } catch (err) {
      console.log(err)
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

export const dislike = userId => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(
        'tinders',
        { userId, type: 'dislike' },
        {
          headers: { 'X-Token': authToken }
        }
      )
      dispatch({ type: REMOVE_TINDER, payload: userId })
    } catch (err) {
      console.log(err)
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
export const turbolike = userId => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(
        'tinders',
        { userId, type: 'turbolike' },
        {
          headers: { 'X-Token': authToken }
        }
      )
      dispatch({ type: REMOVE_TINDER, payload: userId })
    } catch (err) {
      console.log(err)
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
