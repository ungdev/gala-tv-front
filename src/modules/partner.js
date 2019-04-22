import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import errorToString from '../lib/errorToString'

export const SET_PARTNERS = 'partner/SET_PARTNERS'
export const ADD_PARTNER = 'partner/ADD_PARTNER'
export const EDIT_PARTNER = 'partner/EDIT_PARTNER'
export const REMOVE_PARTNER = 'partner/REMOVE_PARTNER'

const initialState = {
  partners: []
}

export default (state = initialState, action) => {
  let { partners } = state
  switch (action.type) {
    case SET_PARTNERS:
      return {
        ...state,
        partners: action.payload
      }
    case ADD_PARTNER:
      return {
        ...state,
        partners: [...partners, action.payload]
      }
    case EDIT_PARTNER:
      partners = partners.map(partner =>
        partner.id === action.payload.id ? action.payload : partner
      )
      return {
        ...state,
        partners
      }
    case REMOVE_PARTNER:
      partners = partners.filter(partner => partner.id !== action.payload)
      return {
        ...state,
        partners
      }
    default:
      return state
  }
}

export const fetchPartners = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('partners/all', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_PARTNERS, payload: res.data })
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

export const editPartner = (id, params) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`partners/${id}`, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: EDIT_PARTNER, payload: res.data })
      dispatch(
        notifActions.notifSend({
          message: 'Le partenaire a été modifié',
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

export const createPartner = params => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.post('partners', params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: ADD_PARTNER, payload: res.data })
      dispatch(
        notifActions.notifSend({
          message: 'Le partenaire a été créé',
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

export const deletePartner = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.delete(`partners/${id}`, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: REMOVE_PARTNER, payload: id })
      dispatch(
        notifActions.notifSend({
          message: 'Le partenaire a été supprimé',
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
