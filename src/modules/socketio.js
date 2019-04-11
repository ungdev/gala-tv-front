import io from "socket.io-client"

export const SET_PARTNERS = 'partner/SET_PARTNERS'

const initialState = {
  partners: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTNERS:
      return {
        ...state,
        partners: action.payload
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
    } catch (err) {
      console.log(err)
    }
  }
}
