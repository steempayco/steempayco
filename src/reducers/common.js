import * as types from '../actions/ActionTypes';

const getAuth = () => {
    let userAuth = localStorage.getItem("user_auth");
    if (!userAuth) return false;
    return JSON.parse(userAuth);
}

const getConfig = () => {
    let config = localStorage.getItem('config');
    if (!config) return false;
    return JSON.parse(config);
}

const initialState = {
    auth: getAuth(),
    config: getConfig(),
    feed: false
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGIN_STATE_UPDATE:
            return {
                ...state,
                auth: getAuth()
            };
        case types.UPDATE_CONFIG:
            return {
                ...state,
                config: getConfig()
            };
        case types.PRICE_FEED:
            return {
                ...state,
                feed: action.feedData
            };
        default:
            return state;
    }
};

export default commonReducer;