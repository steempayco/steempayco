import * as types from './ActionTypes';
import { Storage } from 'aws-amplify';

export const settingSaveInProgress = () => {
    return { type: types.SETTING_SAVE_IN_PROGRESS }
}

export const settingSaveFailed = (error) => {
    return { type: types.SETTING_SAVE_FAILED, error }
}

export const settingSaveSuccess= () => {
    return { type: types.SETTING_SAVE_SUCCESS }
}

export const settingLoadInProgress= () => {
    return { type: types.SETTING_LOAD_IN_PROGRESS }
}

export const settingLoadFailed = (error) => {
    return { type: types.SETTING_LOAD_FAILED, error }
}

export const settingLoadSuccess = () => {
    return { type: types.SETTING_LOAD_SUCCESS }
}

export const updateConfig = () => ({
    type: types.UPDATE_CONFIG
});

export const loadConfig = async (dispatch, force) => {
    let existingConfig = localStorage.getItem('config');
    if (!existingConfig || force) {
        try {
            let url = await Storage.get('config.json', { level: 'private', contentType: 'text/json'})
            let config = await (await fetch(url)).json()
            localStorage.setItem('config', JSON.stringify(config))
        } catch (error) {
            console.log("Failed to load config: " + error)
            const configTemplate = {
                users: [],
                exchanges: [],
            }
            localStorage.setItem('config', JSON.stringify(configTemplate));
        }
    }
    dispatch(updateConfig());
}
