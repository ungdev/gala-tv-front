import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import SET_USER from './user'

export const SET_BEDROOMS = 'bedrooms/SET_BEDROOMS'
export const ADD_BEDROOM = 'bedrooms/ADD_BEDROOM'
export const REMOVE_BEDROOM = 'bedrooms/REMOVE_BEDROOM'
export const ADD_USER_TO_BEDROOM = 'bedrooms/ADD_USER_TO_BEDROOM'
export const REMOVE_USER_TO_BEDROOM = 'bedrooms/REMOVE_USER_TO_BEDROOM'

const initialState = {
    bedrooms: null,
}

export default (state = initialState, action) => {
    let bedrooms = null
    let bedroom = null
    let index = 0
    switch (action.type) {
        case SET_BEDROOMS:
            return {
                ...state,
                bedrooms: action.payload,
            }
        case ADD_BEDROOM:
            bedrooms = state.bedrooms.slice()
            bedrooms.push(action.payload)
            return {
                ...state,
                bedrooms,
            }
        case REMOVE_BEDROOM:
            bedrooms = state.bedrooms.slice()
            bedrooms = bedrooms.filter(room => room.id !== action.payload)
            return {
                ...state,
                bedrooms,
            }
        case ADD_USER_TO_BEDROOM:
            bedrooms = state.bedrooms.slice()
            bedroom = bedrooms.find((room, i) => {
                index = i
                return room.id === action.payload.bedroomId
            })
            bedroom.users.push(action.payload.user)
            bedrooms[index] = bedroom
            return {
                ...state,
                bedrooms,
            }
        case REMOVE_USER_TO_BEDROOM:
            bedrooms = state.bedrooms.slice()
            bedroom = bedrooms.find((room, i) => {
                index = i
                return room.id === action.payload.bedroomId
            })
            bedroom.users = bedroom.users.filter(
                user => user.id !== action.payload.userId
            )
            bedrooms[index] = bedroom
            return {
                ...state,
                bedrooms,
            }
        default:
            return state
    }
}

export const fetchBedrooms = () => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await axios.get('bedrooms', {
                headers: { 'X-Token': authToken },
            })

            dispatch({ type: SET_BEDROOMS, payload: res.data })
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const joinBedroom = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await axios.post(
                `bedrooms/${id}/join`,
                {},
                { headers: { 'X-Token': authToken } }
            )
            if (res.status === 200) {
                let { user } = getState().user
                user.bedroomId = id
                dispatch({ type: SET_USER, payload: user })
                dispatch({
                    type: ADD_USER_TO_BEDROOM,
                    payload: { bedroomId: id, user },
                })
                dispatch(
                    notifActions.notifSend({
                        message: 'Vous avez été ajouté dans la chambre',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const leaveBedroom = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await axios.post(
                `bedrooms/${id}/leave`,
                {},
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                let { user } = getState().user
                user.bedroomId = null
                dispatch({ type: SET_USER, payload: user })
                dispatch({
                    type: REMOVE_USER_TO_BEDROOM,
                    payload: { bedroomId: id, userId: user.id },
                })
                dispatch(
                    notifActions.notifSend({
                        message: 'Vous avez été retiré de la chambre',
                        kind: 'warning',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const addBedroom = data => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await axios.post(`bedrooms`, data, {
                headers: { 'X-Token': authToken },
            })

            if (res.status === 200) {
                let bedroom = res.data
                bedroom.users = []
                dispatch({ type: ADD_BEDROOM, payload: bedroom })
                dispatch(
                    notifActions.notifSend({
                        message: 'Chambre créée avec succès',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}
export const removeBedroom = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await axios.delete(`bedrooms/${id}`, {
                headers: { 'X-Token': authToken },
            })

            if (res.status === 200) {
                dispatch({ type: REMOVE_BEDROOM, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: 'Chambre supprimée',
                        kind: 'warning',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}
