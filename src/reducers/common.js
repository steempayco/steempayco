import * as types from '../actions/ActionTypes';
import globalConfig from 'config'

const getAuth = () => {
    let userAuth = localStorage.getItem("user_auth");
    if (!userAuth) return false;
    return JSON.parse(userAuth);
}

const getConfig = () => {
    let config = globalConfig.defaultConfig;
    let configFromStorage = localStorage.getItem('config');
    if (configFromStorage) {
        let previousConfig = JSON.parse(configFromStorage);
        console.log(previousConfig)
        if (previousConfig.version === config.version) {
            config =  previousConfig
        }
    }
    return config;
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