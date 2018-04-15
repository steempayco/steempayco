import * as types from '../actions/ActionTypes';

const config = {
    users: [],
    exchanges: [],
}

function getConfig() {
    let rawConfig = localStorage.getItem('steempay_config');
    if (!rawConfig) return config;
    try {
        return JSON.parse(rawConfig);
    } catch(error) {
        return config;
    }
}

// 초기 상태를 정의합니다
const initialState = {
    config: getConfig(),
    feed: {}
};

function configManager(state = initialState, action) {
    switch (action. type) {
        case types.UPDATE_CONFIG:
            return {
                ...state,
                config: getConfig()
            };
        case types.PRICE_FEED:
            return {
                ...state,
                feed: action.feedData
            }
        default:
            return state;
    }
};

export default configManager;