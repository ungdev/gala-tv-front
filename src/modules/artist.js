import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import errorToString from '../lib/errorToString'

export const SET_ARTISTS = 'artist/SET_ARTISTS'
export const ADD_ARTIST = 'artist/ADD_ARTIST'
export const EDIT_ARTIST = 'artist/EDIT_ARTIST'
export const REMOVE_ARTIST = 'artist/REMOVE_ARTIST'

const initialState = {
  artists: null
}

export default (state = initialState, action) => {
  let { artists } = state
  switch (action.type) {
    case SET_ARTISTS:
      return {
        ...state,
        artists: action.payload
      }
    case ADD_ARTIST:
      return {
        ...state,
        artists: [...artists, action.payload]
      }
    case EDIT_ARTIST:
      artists = artists.map(artist =>
        artist.id === action.payload.id ? action.payload : artist
      )
      return {
        ...state,
        artists
      }
    case REMOVE_ARTIST:
      artists = artists.filter(artist => artist.id !== action.payload)
      return {
        ...state,
        artists
      }
    default:
      return state
  }
}

export const fetchArtists = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('artists/all', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_ARTISTS, payload: res.data })
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

export const editArtist = (id, params) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`artists/${id}`, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: EDIT_ARTIST, payload: res.data })
      dispatch(
        notifActions.notifSend({
          message: "L'artiste a été modifié",
          dismissAfter: 2000
        })
      )
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

export const createArtist = params => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.post('artists', params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: ADD_ARTIST, payload: res.data })
      dispatch(
        notifActions.notifSend({
          message: "L'artiste a été créé",
          dismissAfter: 2000
        })
      )
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

export const deleteArtist = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.delete(`artists/${id}`, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: REMOVE_ARTIST, payload: id })
      dispatch(
        notifActions.notifSend({
          message: "L'artiste a été supprimé",
          kind: 'warning',
          dismissAfter: 2000
        })
      )
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
