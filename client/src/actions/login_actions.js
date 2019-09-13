import Api from '../api'

const api = new Api()
// types of action
const Types = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    USER_INTENT: "USER_INTENT",
    UNSUCCESSFUL_REQUEST: "UNSUCCESSFUL_REQUEST",
    IS_AUTHORIZED: "IS_AUTHORIZED",
    USER_REGISTER: "USER_REGISTER"
};
// actions
const login = (user) => {
    return dispatch => {
        dispatch({
            type: Types.USER_INTENT
        })

        api.login(user).then((user) => {
            dispatch({
                type: Types.LOGIN,
                payload: user
            })
        }).catch((err) => {
            dispatch({
                type: Types.UNSUCCESSFUL_REQUEST,
                payload: null,
                error: err
            })
        })
    }
}

const isAuthorized = () => {
    return dispatch => {
        dispatch({
            type: Types.USER_INTENT
        })
        api.isAuthorized().then((user) => {
            dispatch({
                type: Types.IS_AUTHORIZED,
                payload: user
            })
        }).catch((error) => {
            dispatch({
                type: Types.UNSUCCESSFUL_REQUEST,
                payload: null,
                error: error
            })
        })
    }
}

const register = (user) => {
    const userStarter = user;
    return dispatch => {
        dispatch({
            type: Types.USER_INTENT
        })
        api.register(user).then((user) => {
            dispatch({
                type: Types.USER_REGISTER,
                payload: user
            })
            const userLogin = {email: userStarter.email, password: userStarter.password}
            return api.login(userLogin)
        })
        .then((user) => {
            dispatch({
                type: Types.LOGIN,
                payload: user
            })
        })
        .catch((error) => {
            dispatch({
                type: Types.UNSUCCESSFUL_REQUEST,
                payload: null,
                error: error
            })
        })
    }
}

const logout = () => {
    return dispatch => {
        dispatch({
            type: Types.USER_INTENT
        })
        api.logout().then(() => {
            dispatch({
                type: Types.LOGOUT,
                payload: null
            })
        }).catch((error) => {
            dispatch({
                type: Types.UNSUCCESSFUL_REQUEST,
                payload: null,
                error: error
            })
        })
    }
    
}

export default {
    login,
    logout,
    isAuthorized,
    register,
    Types
};