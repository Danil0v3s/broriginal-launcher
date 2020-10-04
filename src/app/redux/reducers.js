import { combineReducers } from 'redux'

import MarketplaceReducer from './marketplace/MarketplaceReducer'
import AuthReducer from './auth/AuthReducer'
import AuctionReducer from './auction/AuctionReducer'

import { CLEAR_ERRORS, SET_DOWNLOAD_STATUS } from './MainActionTypes'

function MainReducer(state = {}, action) {
    switch (action.type) {
        case SET_DOWNLOAD_STATUS:
            return {
                ...state,
                downloadStatus: action.payload.downloadStatus
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: {}
            }
        default:
            return state
    }
}

export default combineReducers({
    marketplace: MarketplaceReducer,
    auth: AuthReducer,
    main: MainReducer,
    auction: AuctionReducer
})