import * as actions from '../actions';

let AuthHelper = {
    getAuth: () => {
        try {
            return JSON.parse(localStorage.getItem("user_auth"));
        } catch (error) {
            AuthHelper.clearAuth();
            return false
        }
    },
    clearAuth: () => {
        localStorage.removeItem("user_auth");
    },
    isLoggedIn: () => {
        return AuthHelper.getAuth() ? true : false;
    },
    getIdToken: () => {
        let auth = AuthHelper.getAuth();
        if (auth && auth.signInUserSession) {
            return auth.signInUserSession.idToken.jwtToken
        } else {
            AuthHelper.clearAuth();
            throw "Token not found"
        }
    }
}

export default AuthHelper