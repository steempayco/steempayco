import * as types from '../actions/ActionTypes';

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.USER_LOGIN_STATE_UPDATE:
            return {
                ...state,
                loginStateChecked: true,
                error: false,
                inProgress: false
            };
        case types.USER_LOGIN_IN_PROGRESS:
            return {
                ...state,
                error: false,
                inProgress: true
            };
        case types.USER_LOGIN_ERROR:
            return {
                ...state,
                error: action.error,
                inProgress: false
            };
        case types.USER_SIGNUP_IN_PROGRESS:
            return {
                ...state,
                error: false,
                inProgress: true
            };
        case types.USER_SIGNUP_ERROR:
            return {
                ...state,
                error: action.error,
                inProgress: false
            };
        case types.USER_SIGNUP_CONFIRM_REQUIRED:
            return {
                ...state,
                error: false,
                redirectToConfirm: true,
                redirectToLogin: false,
                inProgress: false
            };
        case types.USER_SIGNUP_CONFIRM_IN_PROGRESS:
            return {
                ...state,
                error: false,
                inProgress: true
            }
        case types.USER_SIGNUP_CONFIRM_ERROR:
            return {
                ...state,
                error: action.error,
                inProgress: false,
            };
        case types.USER_SIGNUP_CONFIRM_SUCCEES:
            return {
                ...state,
                inProgress: false,
                error: false,
                redirectToConfirm: false,
                redirectToLogin: true
            };

        default:
            return state;
    }
};

export default authReducer;