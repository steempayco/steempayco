import * as types from './ActionTypes';

import Amplify, { Auth } from 'aws-amplify';
import config from 'config';

Amplify.configure(config.aws);

export const setUserId = (userId) => {
    localStorage.setItem("user_id", userId);
} 

export const getUserId = () => {
    return localStorage.getItem("user_id");
}

export const userLoginInProgress = () => {
    return { type: types.USER_LOGIN_IN_PROGRESS }
}

export const userLoginStateUpdate = (auth) => {
    return { type: types.USER_LOGIN_STATE_UPDATE, auth }
}

export const userLoginSuccess = (auth) => {
    return { type: types.USER_LOGIN_SUCCESS, auth }
}

export const userLoginFail = (error) => {
    return { type: types.USER_LOGIN_ERROR, error }
}

export const initAuth = () => {
    return (dispatch) => {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                if (user) {
                    dispatch(userLoginStateUpdate(user));
                }
            })
            .catch((error) => {
                console.log("Error loading user: " + error)
            });
    }
}

export const loginRequest = (id, pass) => {
    return (dispatch) => {
        dispatch(userLoginInProgress());
        Auth.signIn(id, pass)
            .then((user) => {
                if (user) {
                    setUserId(id);
                    dispatch(userLoginStateUpdate(user));
                }
            })
            .catch((error) => {
                if (error.code === "UserNotConfirmedException") {
                    dispatch(userSignupConfirmRequired());
                }
                console.log(error);
                dispatch(userLoginFail(error.message));
            });
    }
}

export const logoutRequest = () => {
    return (dispatch) => {
        dispatch(userLoginStateUpdate(false));
        setUserId('');
        Auth.signOut()
            .catch((error) => {
            });
    }
}

export const userSignupInProgress = () => {
    return { type: types.USER_SIGNUP_IN_PROGRESS }
}

export const userSignupSuccess = () => {
    return { type: types.USER_SIGNUP_SUCCESS }
}

export const userSignupFail = (error) => {
    return { type: types.USER_SIGNUP_ERROR, error }
}

export const userSignupConfirmRequired = () => {
    return { type: types.USER_SIGNUP_CONFIRM_REQUIRED }
}

export const signupRequest = (dispatch, id, pass, attributes) => {
    dispatch(userSignupInProgress());
    Auth.signUp({username: id, password: pass, attributes})
        .then((user) => {
            setUserId(id);
            if (user.userConfirmed) {
                dispatch(userSignupSuccess());
            } else {
                dispatch(userSignupConfirmRequired());
            }
        })
        .catch((error) => {
            console.log(error);
            dispatch(userSignupFail(error.message));
        });
}



export const userSignupConfirmInProgress = () => {
    return { type: types.USER_SIGNUP_CONFIRM_IN_PROGRESS }
}

export const userSignupConfirmSuccess = () => {
    return { type: types.USER_SIGNUP_CONFIRM_SUCCEES }
}

export const userSignupConfirmError = (error) => {
    return { type: types.USER_SIGNUP_CONFIRM_ERROR, error }
}

export const signupConfirmRequest = (dispatch, id, code) => {
    dispatch(userSignupConfirmInProgress())
    Auth.confirmSignUp(id, code)
        .then((user) => {
            console.log(user);
            dispatch(userSignupConfirmSuccess());
        })
        .catch((error) => {
            console.log(error);
            dispatch(userSignupConfirmError(error.message));
        });
}