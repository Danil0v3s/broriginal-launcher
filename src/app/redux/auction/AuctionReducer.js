import { ADD_AUCTION_ITEM, REMOVE_AUCTION_ITEM, SET_AUCTION_DATA, SET_AUCTION_ERROR } from "./AuctionActionTypes"

const initialState = {
    listings: [],
    error: undefined
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_AUCTION_DATA:
            return {
                ...state,
                listings: action.payload.listings
            }
        case SET_AUCTION_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        case REMOVE_AUCTION_ITEM:
            return {
                ...state,
                listings: state.listings.filter(it => it.auction_id !== action.payload.auctionId)
            }
        case ADD_AUCTION_ITEM:
            return {
                ...state,
                listings: [action.payload.item, ...state.listings]
            }
        default:
            return state
    }
}