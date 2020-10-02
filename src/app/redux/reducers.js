import { combineReducers } from 'redux'
import MarketplaceReducer from './marketplace/MarketplaceReducer'
import AuthReducer from './auth/AuthReducer'
import { CLEAR_ERRORS } from './MainActionTypes'

function MainReducer(state = {}, action) {
    switch (action.type) {
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
    main: MainReducer
})