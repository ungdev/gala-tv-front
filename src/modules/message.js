import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import errorToString from '../lib/errorToString'

export const SET_MESSAGES = 'message/SET_MESSAGES'
export const ADD_MESSAGE = 'message/ADD_MESSAGE'
export const EDIT_MESSAGE = 'message/EDIT_MESSAGE'
export const REMOVE_MESSAGE = 'message/REMOVE_MESSAGE'

const initialState = {
  messages: []
}

export default (state = initialState, action) => {
  let messages = null
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    case ADD_MESSAGE:
      messages = state.messages.slice()
      messages.push(action.payload)
      return {
        ...state,
        messages
      }
    case EDIT_MESSAGE:
      messages = state.messages
        .slice()
        .map(message =>
          message.id === action.payload.id ? action.payload : message
        )
      return {
        ...state,
        messages
      }
    case REMOVE_MESSAGE:
      messages = state.messages.slice()
      messages = messages.filter(message => message.id !== action.payload)
      return {
        ...state,
        messages
      }
    default:
      return state
  }
}

export const editMessage = (id, params) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`messages/${id}`, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: EDIT_MESSAGE, payload: res.data })
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

export const createMessage = content => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.post(
        'messages',
        { content },
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
      dispatch({ type: ADD_MESSAGE, payload: res.data })
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

export const deleteMessage = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.delete(`messages/${id}`, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: REMOVE_MESSAGE, payload: id })
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
