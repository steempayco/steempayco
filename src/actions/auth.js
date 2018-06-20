import * as types from './ActionTypes';

import { Auth } from 'aws-amplify';
import * as setting from './setting';

export const setUserId = (userId) => {
    localStorage.setItem("user_id", userId);
} 

export const getUserId = () => {
    return localStorage.getItem("user_id");
}

export const userLoginInProgress = () => {
    return { type: types.USER_LOGIN_IN_PROGRESS }
}

export const userLoginStateUpdate = () => {
    return { type: types.USER_LOGIN_STATE_UPDATE }
}

export const userLoginSuccess = (auth) => {
    return { type: types.USER_LOGIN_SUCCESS, auth }
}

export const userLoginFail = (error) => {
    return { type: types.USER_LOGIN_ERROR, error }
}

export const initAuth = async (dispatch) => {
    try {
        let user = await Auth.currentAuthenticatedUser()
        if (user) {
            await setting.loadConfig(dispatch, false);
            dispatch(userLoginStateUpdate(user));
        }
    } catch (error) {
        console.log("Error loading user: " + error);
        dispatch(userLoginStateUpdate(false));
    }
}

export const loginRequest = async (dispatch, id, pass) => {
    dispatch(userLoginInProgress());
    try {
        await Auth.signIn(id, pass);
        let user_auth = await Auth.currentAuthenticatedUser()
        localStorage.setItem("user_auth", JSON.stringify(user_auth));
        localStorage.setItem("user_id", id);
        //window.location.reload();
        await setting.loadConfig(dispatch, true);
        dispatch(userLoginStateUpdate());
    } catch (error) {
        console.log("Login error: " + error);
        if (error.code === "UserNotConfirmedException") {
            dispatch(userSignupConfirmRequired());
        }
        dispatch(userLoginFail(error.message));
    }
}

export const logoutRequest = async (dispatch) => {
    dispatch(userLoginStateUpdate(false));
    try {
        await Auth.signOut();
        localStorage.removeItem("user_auth");
        window.location.reload();
    } catch (error) {
        console.log("Logout failed " + error);
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