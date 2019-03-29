import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_TARGETS = 'target/SET_TARGETS'
export const SET_USERS = 'target/SET_USERS'
export const SET_MATCHS = 'target/SET_MATCHS'
export const SET_MOST_TARGETED = 'target/SET_MOST_TARGETED'
export const REMOVE_TARGET = 'target/REMOVE_TARGET'

const initialState = {
  targets: [],
  users: [],
  matchs: [],
  mostTargeted: []
}

export default (state = initialState, action) => {
  let targets = []
  switch (action.type) {
    case SET_TARGETS:
      return {
        ...state,
        targets: action.payload
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
    case SET_MOST_TARGETED:
      return {
        ...state,
        mostTargeted: action.payload
      }
    case REMOVE_TARGET:
      targets = state.targets.slice()
      targets = targets.filter(t => t.id !== action.payload)
      return {
        ...state,
        targets
      }
    default:
      return state
  }
}

export const fetchTargets = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('targets', {
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: SET_TARGETS, payload: res.data })
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

export const fetchTargetUsers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('targets/users', {
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
export const fetchTopTargets = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('targets/top', {
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: SET_MOST_TARGETED, payload: res.data })
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
      const res = await axios.get('targets/matchs', {
        headers: { 'X-Token': authToken }
      })
      console.log(res)
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
export const target = userId => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(
        'targets',
        { userId, type: 'target' },
        {
          headers: { 'X-Token': authToken }
        }
      )
      dispatch({ type: REMOVE_TARGET, payload: userId })
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

export const notTarget = userId => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(
        'targets',
        { userId, type: 'notTarget' },
        {
          headers: { 'X-Token': authToken }
        }
      )
      dispatch({ type: REMOVE_TARGET, payload: userId })
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