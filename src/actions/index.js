import * as types from './ActionTypes';
import Amplify from 'aws-amplify';
import { Auth } from "aws-amplify";
import config from 'config';
export * from './auth.js';

Amplify.configure(config.aws);

export const updateConfig = () => ({
    type: types.UPDATE_CONFIG
});

export const priceFeed = (feedData) => ({
    type: types.PRICE_FEED,
    feedData
});

export const authStatus = (authStatus) => ({
    type: types.AUTH_STATUS,
    authStatus
})