import { combineReducers } from 'redux'
import auth from './auth'
import common from './common'
import setting from './setting'

export default combineReducers({
    auth,
    common,
    setting
})