import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loginForm: {
        email: '',
        password: ''
    },
    userAuthData: {
        isAuthenticated: false,
        id: '',
        username: '',
        email: '',
    },
    adminAuthData: {
        isAuthenticated: false,
        id: '',
        username: '',
        email: '',
    },
    showLoginModal: false
}

const loginInputChange = (state, action) => {
    let updatedFormData;
    updatedFormData = updateObject(state.loginForm, { [action.key]: action.value });

    return updateObject(state, { loginForm: updatedFormData })
}

const loginSuccess = (state, action) => {

    const updatedLoginForm = updateObject(state.loginForm, {
        email: '',
        password: ''
    });

    if (action.method === 'adminLogin') {
        const updatedAdminAuthData = updateObject(state.adminAuthData, {
            isAuthenticated: true,
            id: action.res.id,
            username: action.res.username,
            email: action.res.email
        })
    
        return updateObject(state, {
            showLoginModal: false,
            loginForm: updatedLoginForm,
            adminAuthData: updatedAdminAuthData
        })
    }
    const updatedUserAuthData = updateObject(state.userAuthData, {
        isAuthenticated: true,
        id: action.res.id,
        username: action.res.username,
        email: action.res.email
    })

    return updateObject(state, {
        showLoginModal: false,
        loginForm: updatedLoginForm,
        userAuthData: updatedUserAuthData
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_INPUT_CHANGE:
            return loginInputChange(state, action)
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return loginSuccess(state, action)
        case actionTypes.SHOW_LOGIN_MODAL:
            return updateObject(state, {
                showLoginModal: !state.showLoginModal
            })
        default:
            return state;
    }
}
export default reducer;