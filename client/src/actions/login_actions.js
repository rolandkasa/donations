import Api from '../api'

const api = new Api()
// types of action
const Types = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    USER_INTENT: "USER_INTENT",
    UNSUCCESSFUL_REQUEST: "UNSUCCESSFUL_REQUEST"
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
    Types
};