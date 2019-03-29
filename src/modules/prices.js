import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_PRICES = 'prices/SET_PRICES'
export const SET_PRICE = 'prices/SET_PRICE'
export const SET_BACCHUS_TROUE_REDUC = 'prices/SET_BACCHUS_TROUE_REDUC'
export const SET_BEDROOM_SUPPLEMENT = 'prices/SET_BEDROOM_SUPPLEMENT'
export const ADD_PRICE = 'prices/ADD_PRICE'
export const REMOVE_PRICE = 'prices/REMOVE_PRICE'

const initialState = {
  prices: null,
  price: null,
  bacchusTroue: 0,
  bedroomPrice: 0
}

export default (state = initialState, action) => {
  let prices = null
  switch (action.type) {
    case SET_PRICES:
      return {
        ...state,
        prices: action.payload
      }
    case SET_PRICE:
      return {
        ...state,
        price: action.payload
      }
    case SET_BACCHUS_TROUE_REDUC:
      return {
        ...state,
        bacchusTroue: action.payload
      }
    case SET_BEDROOM_SUPPLEMENT:
      return {
        ...state,
        bedroomPrice: action.payload
      }
    case ADD_PRICE:
      prices = state.prices.slice()
      prices.push(action.payload)
      return {
        ...state,
        prices
      }
    case REMOVE_PRICE:
      prices = state.prices.slice()
      prices = prices.filter(room => room.id !== action.payload)
      return {
        ...state,
        prices
      }
    default:
      return state
  }
}

export const fetchPrices = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('prices', { // only for admin
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: SET_PRICES, payload: res.data.prices })
      dispatch({
        type: SET_BACCHUS_TROUE_REDUC,
        payload: res.data.bacchusTroueReduc
      })
      dispatch({
        type: SET_BEDROOM_SUPPLEMENT,
        payload: res.data.bedroomSupplement
      })
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

export const fetchPrice = () => { //get current price
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('price', {
        headers: { 'X-Token': authToken }
      })
      dispatch({ type: SET_PRICE, payload: res.data.price })
      dispatch({
        type: SET_BACCHUS_TROUE_REDUC,
        payload: res.data.bacchusTroueReduc
      })
      dispatch({
        type: SET_BEDROOM_SUPPLEMENT,
        payload: res.data.bedroomSupplement
      })
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

export const addPrice = data => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post(`prices`, data, {
        headers: { 'X-Token': authToken }
      })

      if (res.status === 200) {
        let price = res.data
        price.users = []
        dispatch({ type: ADD_PRICE, payload: price })
        dispatch(
          notifActions.notifSend({
            message: 'Formule créée avec succès',
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
export const removePrice = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.delete(`prices/${id}`, {
        headers: { 'X-Token': authToken }
      })

      if (res.status === 200) {
        dispatch({ type: REMOVE_PRICE, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'Formule supprimée',
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
