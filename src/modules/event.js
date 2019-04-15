import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import errorToString from '../lib/errorToString'

export const SET_EVENTS = 'event/SET_EVENTS'
export const ADD_EVENT = 'event/ADD_EVENT'
export const EDIT_EVENT = 'event/EDIT_EVENT'
export const REMOVE_EVENT = 'event/REMOVE_EVENT'

const initialState = {
  events: null
}

export default (state = initialState, action) => {
  let events = null
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload
      }
    case ADD_EVENT:
      events = state.events.slice()
      events.push(action.payload)
      return {
        ...state,
        events
      }
    case EDIT_EVENT:
      events = state.events
        .slice()
        .map(event => (event.id === action.payload.id ? action.payload : event))
      return {
        ...state,
        events
      }
    case REMOVE_EVENT:
      events = state.events.slice()
      events = events.filter(event => event.id !== action.payload)
      return {
        ...state,
        events
      }
    default:
      return state
  }
}

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('events/all', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_EVENTS, payload: res.data })
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

export const editEvent = (id, params) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    if(!params.artist) params.artist = ''
    try {
      const res = await axios.put(`events/${id}`, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: EDIT_EVENT, payload: res.data })
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

export const createEvent = params => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    if(!params.artist) params.artist = ''
    try {
      const res = await axios.post('events', params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: ADD_EVENT, payload: res.data })
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

export const deleteEvent = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.delete(`events/${id}`, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: REMOVE_EVENT, payload: id })
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
