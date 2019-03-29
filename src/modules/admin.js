import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_USERS = 'admin/SET_USERS'
export const SET_USERS_ROLES = 'admin/SET_USERS_ROLES'
export const SET_COUNTS = 'admin/SET_COUNTS'
export const SET_CHARTDATA = 'admin/SET_CHARTDATA'

export const SET_USER_ADMIN = 'admin/SET_USER_ADMIN'
export const SET_USER_ORGA = 'admin/SET_USER_ORGA'
export const SET_USER_TRESO = 'admin/SET_USER_TRESO'
export const SET_USER_WRITE = 'admin/SET_USER_WRITE'

export const REMOVE_USER_ADMIN = 'admin/REMOVE_USER_ADMIN'
export const REMOVE_USER_ORGA = 'admin/REMOVE_USER_ORGA'
export const REMOVE_USER_TRESO = 'admin/REMOVE_USER_TRESO'
export const REMOVE_USER_WRITE = 'admin/REMOVE_USER_WRITE'

export const SET_USER_PAID = 'admin/SET_USER_PAID'
export const SET_USER_UNPAID = 'admin/SET_USER_UNPAID'
export const SET_USER_CAUTION = 'admin/SET_USER_CAUTION'
export const SET_USER_NO_CAUTION = 'admin/SET_USER_NO_CAUTION'
export const SET_USER_PLACE = 'admin/SET_USER_PLACE'
export const SET_USER_RESPO = 'admin/SET_USER_RESPO'
export const SET_USER_PERMISSION = 'admin/SET_USER_PERMISSION'
export const SET_USER_VALID = 'admin/SET_USER_VALID'
export const SET_USER_UNVALID = 'admin/SET_USER_UNVALID'

const initialState = {
    users: [],
    respo: [],
    chartData: { daily: [], cumul: [] },
}

export default (state = initialState, action) => {
    let users = state.users.slice(0)
    let userId = null
    let index = null

    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case SET_USERS_ROLES:
            return {
                ...state,
                users: action.payload,
            }
        case SET_COUNTS:
            return {
                ...state,
                counts: action.payload,
            }
        case SET_CHARTDATA:
            return {
                ...state,
                chartData: action.payload,
            }

        case SET_USER_ADMIN:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            console.log('userId', 'index', users[index])
            if (!users[index].permission) {
                users[index].permission = { admin: true }
            } else {
                users[index].permission.admin = true
            }
            return {
                ...state,
                users,
            }
        case REMOVE_USER_ADMIN:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].permission.admin = false
            return {
                ...state,
                users,
            }

        case SET_USER_ORGA:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            if (!users[index].permission) {
                users[index].permission = { bureau: true }
            } else {
                users[index].permission.bureau = true
            }
            return {
                ...state,
                users,
            }
        case REMOVE_USER_ORGA:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].permission.bureau = false
            return {
                ...state,
                users,
            }
        case SET_USER_TRESO:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            if (!users[index].permission) {
                users[index].permission = { treso: true }
            } else {
                users[index].permission.treso = true
            }
            return {
                ...state,
                users,
            }
        case REMOVE_USER_TRESO:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].permission.treso = false
            return {
                ...state,
                users,
            }

        case SET_USER_WRITE:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            if (!users[index].permission) {
                users[index].permission = { write: true }
            } else {
                users[index].permission.write = true
            }
            return {
                ...state,
                users,
            }
        case REMOVE_USER_WRITE:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].permission.write = false
            return {
                ...state,
                users,
            }

        case SET_USER_PAID:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].paid = true
            return {
                ...state,
                users,
            }
        case SET_USER_UNPAID:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].paid = false
            return {
                ...state,
                users,
            }
        case SET_USER_CAUTION:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].caution = true
            return {
                ...state,
                users,
            }
        case SET_USER_NO_CAUTION:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].caution = false
            return {
                ...state,
                users,
            }
        case SET_USER_RESPO:
            index = users.findIndex(u => u.id === action.payload.id)
            users[index].permission.respo = action.payload.respo.toString()
            return {
                ...state,
                users,
            }
        case SET_USER_PERMISSION:
            index = users.findIndex(u => u.id === action.payload.id)
            users[
                index
            ].permission.permission = action.payload.permission.toString()
            return {
                ...state,
                users,
            }
        case SET_USER_VALID:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].validated = true
            return {
                ...state,
                users,
            }
        case SET_USER_UNVALID:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].validated = false
            return {
                ...state,
                users,
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
            const res = await axios.get('admin/list', {
                headers: { 'X-Token': authToken },
            })

            dispatch({ type: SET_USERS_ROLES, payload: res.data })
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

export const fetchUsersRoles = () => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) return

        try {
            const res = await axios.get('admin/listRoles', {
                headers: { 'X-Token': authToken },
            })

            dispatch({ type: SET_USERS_ROLES, payload: res.data })
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

export const validatePayment = (userId, alcool, bedroom) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.post(
                `admin/forcepay`,
                { userId, alcool, bedroom },
                { headers: { 'X-Token': authToken } }
            )
            if (res.status === 200) {
                dispatch({ type: SET_USER_PAID, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Paiement validé',
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

export const unvalidatePayment = userId => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.delete(`admin/forcepay/${userId}`, {
                headers: { 'X-Token': authToken },
            })
            if (res.status === 200) {
                dispatch({ type: SET_USER_UNPAID, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Paiement supprimé',
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

export const validateCaution = userId => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.post(
                `admin/caution`,
                { userId },
                { headers: { 'X-Token': authToken } }
            )
            if (res.status === 200) {
                dispatch({ type: SET_USER_CAUTION, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Caution validé',
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

export const unvalidateCaution = userId => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.delete(`admin/caution/${userId}`, {
                headers: { 'X-Token': authToken },
            })
            if (res.status === 200) {
                dispatch({ type: SET_USER_NO_CAUTION, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Caution supprimé',
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

export const validateUser = userId => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.post(
                `admin/validate`,
                { userId },
                { headers: { 'X-Token': authToken } }
            )
            if (res.status === 200) {
                dispatch({ type: SET_USER_VALID, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Participant validé',
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
export const unvalidateUser = userId => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.post(
                `admin/unvalidate`,
                { userId },
                { headers: { 'X-Token': authToken } }
            )
            if (res.status === 200) {
                dispatch({ type: SET_USER_UNVALID, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Participant annulé',
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

export const setAdmin = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setAdmin/${id}`,
                { admin: true },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: SET_USER_ADMIN, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur est maintenant administrateur",
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

export const removeAdmin = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setAdmin/${id}`,
                { admin: false },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: REMOVE_USER_ADMIN, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message:
                            "L'utilisateur n'est maintenant plus administrateur",
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

export const setOrga = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setOrga/${id}`,
                { orga: true },
                { headers: { 'X-Token': authToken } }
            )
            console.log(res)
            if (res.status === 200) {
                dispatch({ type: SET_USER_ORGA, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur est maintenant organisateur",
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

export const removeOrga = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setOrga/${id}`,
                { orga: false },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: REMOVE_USER_ORGA, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message:
                            "L'utilisateur n'est maintenant plus organisateur",
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

export const setTreso = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setTreso/${id}`,
                { treso: true },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: SET_USER_TRESO, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur est maintenant trésorier",
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

export const removeTreso = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setTreso/${id}`,
                { treso: false },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: REMOVE_USER_TRESO, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message:
                            "L'utilisateur n'est maintenant plus trésorier",
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

export const setRedac = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setRedac/${id}`,
                { write: true },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: SET_USER_WRITE, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur est maintenant rédacteur",
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

export const removeRedac = id => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setRedac/${id}`,
                { write: false },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: REMOVE_USER_WRITE, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message:
                            "L'utilisateur n'est maintenant plus rédacteur",
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
