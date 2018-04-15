import * as types from './ActionTypes';

export const updateConfig = () => ({
    type: types.UPDATE_CONFIG
});

export const priceFeed = (feedData) => ({
    type: types.PRICE_FEED,
    feedData
});