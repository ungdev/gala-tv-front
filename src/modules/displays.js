import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const GET_DISPLAYS = 'displays/GET_DISPLAYS'
export const ENABLE_DISPLAY = 'displays/SET_DISPLAY'
export const DISABLE_DISPLAY = 'displays/DISABLE_DISPLAY'

const initialState = {
  displays: []
}

export default (state = initialState, action) => {
  let displays = state.displays.slice()
  let code = null
  let index = null
  switch (action.type) {
    case GET_DISPLAYS:
      return {
        ...state,
        displays: action.payload
      }
    case ENABLE_DISPLAY:
      code = action.payload
      index = displays.findIndex(display => display.code === code)
      displays[index].render = true
      return {
        ...state,
        displays
      }
    case DISABLE_DISPLAY:
      code = action.payload
      index = displays.findIndex(display => display.code === code)
      displays[index].render = false
      return {
        ...state,
        displays
      }
    default:
      return state
  }
}

export const getDisplays = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('displays', {
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: GET_DISPLAYS, payload: res.data })
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

export const enableDisplay = code => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.post(
        `displays/${code}/enable`,
        {},
        { headers: { 'X-Token': authToken } }
      )

      if (res.status === 200) {
        dispatch({ type: ENABLE_DISPLAY, payload: code })
        dispatch(
          notifActions.notifSend({
            message: 'Elément désormais affiché.',
            dismissAfter: 2000
          })
        )
      }
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

export const disableDisplay = code => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.post(
        `displays/${code}/disable`,
        {},
        { headers: { 'X-Token': authToken } }
      )

      if (res.status === 200) {
        dispatch({ type: DISABLE_DISPLAY, payload: code })
        dispatch(
          notifActions.notifSend({
            message: 'Elément désormais caché.',
            kind: 'warning',
            dismissAfter: 2000
          })
        )
      }
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
