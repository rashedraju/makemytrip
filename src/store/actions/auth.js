import * as actionTypes from './actionTypes';
import api from '../../api';

export const inputChanged = (key, value) => {
    return {
        type: actionTypes.LOGIN_INPUT_CHANGE,
        key,
        value,
    }
}

const loginSucces = (res, method) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        res,
        method
    }
}

export const onLogin = (data) => dispatch => {
    api.makeMyTrip().login(data)
        .then(res => {
            if (res.data.success === 1) dispatch(loginSucces(res.data.auth[0], data.method))
            else alert("Failed to Login")
        })
        .catch(() => alert("Failed to Login"))
}

const signupSuccess = (res) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        res
    }
}

export const signup = (data) => dispatch => {
    api.makeMyTrip().signup(data)
        .then(res => {
            if (res.data.success === 1) dispatch(signupSuccess(res.data.user[0]))
            else alert('Failed to signup!')
        })
        .catch(() => alert('Failed to signup!'))
}

export const showLoginModal = () => {
    return {
        type: actionTypes.SHOW_LOGIN_MODAL
    }
}