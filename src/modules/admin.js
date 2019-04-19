import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import errorToString from '../lib/errorToString'

export const SET_USERS = 'admin/SET_USERS'
export const SET_ADMIN = 'admin/SET_ADMIN'
export const REMOVE_ADMIN = 'admin/REMOVE_ADMIN'

const initialState = {
  users: null
}

export default (state = initialState, action) => {
  let users = null
  switch (action.type) {
    case SET_USERS:
      users = action.payload.map(user => {
        return {
          ...user,
          admin: user.permissions.findIndex(u => u === 'admin') !== -1
        }
      })
      return {
        ...state,
        users
      }
    case SET_ADMIN:
      users = state.users.map(user => {
        if (user.id !== action.payload) return user
        let { permissions } = user
        if (!permissions) permissions = []
        permissions.push('admin')
        return { ...user, permissions, admin: true }
      })
      return {
        ...state,
        users
      }
    case REMOVE_ADMIN:
      users = state.users.map(user => {
        if (user.id !== action.payload) return user
        let { permissions } = user
        permissions = permissions.filter(p => p !== 'admin')
        return { ...user, permissions, admin: false }
      })
      return {
        ...state,
        users
      }

    default:
      return state
  }
}

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('users', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_USERS, payload: res.data })
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

export const setAdmin = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.post(
        `users/${id}/admin`,
        {},
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
      dispatch({ type: SET_ADMIN, payload: id })

      dispatch(
        notifActions.notifSend({
          message: 'Cette personne est maintenant administrateur',
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

export const removeAdmin = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.delete(`users/${id}/admin`, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: REMOVE_ADMIN, payload: id })

      dispatch(
        notifActions.notifSend({
          message: "Cette personne n'est plus administrateur",
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
