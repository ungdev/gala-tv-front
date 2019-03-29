import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import SET_USER from './user'

export const SET_TEAMS = 'teams/SET_TEAMS'
export const ADD_TEAM = 'teams/ADD_TEAM'
export const REMOVE_TEAM = 'teams/REMOVE_TEAM'
export const ADD_USER_TO_TEAM = 'teams/ADD_USER_TO_TEAM'
export const REMOVE_USER_TO_TEAM = 'teams/REMOVE_USER_TO_TEAM'

const initialState = {
  teams: null
}

export default (state = initialState, action) => {
  let teams = null
  let team = null
  let index = 0
  switch (action.type) {
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload
      }
    case ADD_TEAM:
      teams = state.teams.slice()
      teams.push(action.payload)
      return {
        ...state,
        teams
      }
    case REMOVE_TEAM:
      teams = state.teams.slice()
      teams = teams.filter(room => room.id !== action.payload)
      return {
        ...state,
        teams
      }
    case ADD_USER_TO_TEAM:
      teams = state.teams.slice()
      team = teams.find((room, i) => {
        index = i
        return room.id === action.payload.teamId
      })
      team.users.push(action.payload.user)
      teams[index] = team
      return {
        ...state,
        teams
      }
    case REMOVE_USER_TO_TEAM:
      teams = state.teams.slice()
      team = teams.find((room, i) => {
        index = i
        return room.id === action.payload.teamId
      })
      team.users = team.users.filter(user => user.id !== action.payload.userId)
      teams[index] = team
      return {
        ...state,
        teams
      }
    default:
      return state
  }
}

export const fetchTeams = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('teams', { headers: { 'X-Token': authToken } })
      dispatch({ type: SET_TEAMS, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const joinTeam = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post(`teams/${id}/join`, {}, { headers: { 'X-Token': authToken } })
      if (res.status === 200) {
        let { user } = getState().user
        user.teamId = id
        dispatch({ type: SET_USER, payload: user })
        dispatch({ type: ADD_USER_TO_TEAM, payload: { teamId: id, user} })
        dispatch(
          notifActions.notifSend({
            message: 'Vous avez été ajouté dans l\'équipe',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const leaveTeam = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post(`teams/${id}/leave`, {}, { headers: { 'X-Token': authToken } })

      if (res.status === 200) {
        let { user } = getState().user
        user.teamId = null
        dispatch({ type: SET_USER, payload: user })
        dispatch({ type: REMOVE_USER_TO_TEAM, payload: { teamId: id, userId: user.id} })
        dispatch(
          notifActions.notifSend({
            message: 'Vous avez été retiré de l\'équipe',
            kind: 'warning',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const addTeam = (data) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post(`teams`, data, { headers: { 'X-Token': authToken } })

      if (res.status === 200) {
        let team = res.data
        team.users = []
        dispatch({ type: ADD_TEAM, payload: team })
        dispatch(
          notifActions.notifSend({
            message: 'Équipe créée avec succès',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}
export const removeTeam = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.delete(`teams/${id}`, { headers: { 'X-Token': authToken } })

      if (res.status === 200) {
        dispatch({ type: REMOVE_TEAM, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'Équipe supprimée',
            kind: 'warning',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}
