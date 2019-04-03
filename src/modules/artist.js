import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import errorToString from '../lib/errorToString'

export const SET_ARTISTS = 'artist/SET_ARTISTS'
export const ADD_ARTIST = 'artist/ADD_ARTIST'
export const REMOVE_ARTIST = 'artist/REMOVE_ARTIST'

const initialState = {
  artists: null
}

export default (state = initialState, action) => {
  let artists = null
  switch (action.type) {
    case SET_ARTISTS:
      return {
        ...state,
        artists: action.payload
      }
    case ADD_ARTIST:
      artists = state.artists.slice()
      artists.push(action.payload)
      return {
        ...state,
        artists
      }
    case REMOVE_ARTIST:
      artists = state.artists.slice()
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
      const res = await axios.delete(
        `artists/${id}`,
        {}, // check if there's a body or not
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
      dispatch({ type: REMOVE_ARTIST, payload: id })
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
