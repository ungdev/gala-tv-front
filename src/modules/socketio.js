import io from 'socket.io-client'

export const SET_CENSOREDS = 'socketio/SET_CENSOREDS'
export const SET_PARTNERS = 'socketio/SET_PARTNERS'
export const SET_EVENTS = 'socketio/SET_EVENTS'
export const SET_MESSAGES = 'socketio/SET_MESSAGES'
export const SET_TWEETS = 'socketio/SET_TWEETS'
export const SET_NOTIFICATION = 'socketio/SET_NOTIFICATION'

const initialState = {
  censoreds: [],
  events: [],
  partners: null,
  messages: [],
  tweets: [],
  notification: null
}
let timeout = null
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTNERS:
      return {
        ...state,
        partners: action.payload
      }
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload
      }
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    case SET_CENSOREDS:
      return {
        ...state,
        censoreds: action.payload
      }
    case SET_TWEETS:
      return {
        ...state,
        tweets: action.payload
      }
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload
      }
    default:
      return state
  }
}

export const startSocketIO = () => {
  return async dispatch => {
    try {
      let socket = io.connect(process.env.REACT_APP_API_SOCKETIO)
      socket.on('censoreds', censoreds => {
        dispatch({ type: SET_CENSOREDS, payload: censoreds })
      })
      socket.on('events', events => {
        dispatch({ type: SET_EVENTS, payload: events })
      })
      socket.on('partners', partners => {
        dispatch({ type: SET_PARTNERS, payload: partners })
      })
      socket.on('messages', messages => {
        dispatch({ type: SET_MESSAGES, payload: messages })
      })
      socket.on('tweets', tweets => {
        dispatch({ type: SET_TWEETS, payload: tweets })
      })

      socket.on('notification', notification => {
        dispatch({ type: SET_NOTIFICATION, payload: notification })
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(
          () => dispatch({ type: SET_NOTIFICATION, payload: null }),
          15000
        )
      })
    } catch (err) {
      console.log(err)
    }
  }
}
