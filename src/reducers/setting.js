import * as types from '../actions/ActionTypes';

const settingReducer = (state = {}, action) => {
    switch (action.type) {
        case types.SETTING_SAVE_IN_PROGRESS:
            return {
                ...state,
                inProgress: true
            };
        case types.SETTING_SAVE_FAILED:
            return {
                ...state,
                error: action.error,
                inProgress: false
            };
        case types.SETTING_SAVE_SUCCESS:
            return {
                ...state,
                inProgress: false
            };
        case types.SETTING_LOAD_IN_PROGRESS:
            return {
                ...state,
                inProgress: true
            };
        case types.SETTING_LOAD_FAILED:
            return {
                ...state,
                error: action.error,
                inProgress: false
            };
        case types.SETTING_LOAD_SUCCESS:
            return {
                ...state,
                inProgress: false
            };
        default:
            return state;
    }
};

export default settingReducer;