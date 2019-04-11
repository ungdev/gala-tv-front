import io from 'socket.io-client'

export const SET_PARTNERS = 'socketio/SET_PARTNERS'
export const SET_MESSAGES = 'socketio/SET_MESSAGES'

const initialState = {
  partners: null,
  messages: []
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
    } catch (err) {
      console.log(err)
    }
  }
}
