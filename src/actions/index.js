import * as types from './ActionTypes';
export * from './auth.js';

export const updateConfig = () => ({
    type: types.UPDATE_CONFIG
});

export const priceFeed = (feedData) => ({
    type: types.PRICE_FEED,
    feedData
});