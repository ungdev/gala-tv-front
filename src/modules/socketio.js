import io from 'socket.io-client'

export const SET_PARTNERS = 'socketio/SET_PARTNERS'
export const SET_MESSAGES = 'socketio/SET_MESSAGES'
export const SET_TWEETS = 'socketio/SET_TWEETS'

const initialState = {
  partners: null,
  messages: [],
  tweets: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTNERS:
      return {
        ...state,
        partners: action.payload
      }
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    case SET_TWEETS:
      return {
        ...state,
        tweets: action.payload
      }
    default:
      return state
  }
}

export const startSocketIO = () => {
  return async (dispatch, getState) => {
    try {
      let socket = io.connect(process.env.REACT_APP_API_SOCKETIO)
      socket.on('partners', partners => {
        dispatch({ type: SET_PARTNERS, payload: partners })
      })
      socket.on('messages', messages => {
        dispatch({ type: SET_MESSAGES, payload: messages })
      })
      socket.on('tweets', tweets => {
        console.log(tweets)
        dispatch({ type: SET_TWEETS, payload: tweets })
      })
    } catch (err) {
      console.log(err)
    }
  }
}
