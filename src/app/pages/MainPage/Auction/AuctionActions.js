import axios from 'axios';
import { SET_AUCTION_DATA, SET_AUCTION_ERROR } from '../../../redux/auction/AuctionActionTypes';

export function fetchListings() {
    return async dispatch => {
        const { Authorization } = await axios.defaults.headers.common
        try {
            const { data } = await axios.get('auction/list', { headers: { Authorization } });
            dispatch({
                type: SET_AUCTION_DATA,
                payload: { listings: data.data }
            })
        } catch (error) {
            if (error.response) {
                dispatch({
                    type: SET_AUCTION_ERROR,
                    payload: { error: error.response.data.message }
                });
            }
        }
    }
}



export function bidAuction(auctionId) {
    return async dispatch => {
        const { Authorization } = await axios.defaults.headers.common
        try {
            axios.post('auction/buy', { auctionId }, { headers: { Authorization } });
        } catch (error) {
            if (error.response) {
                dispatch({
                    type: SET_AUCTION_ERROR,
                    payload: { error: error.response.data.message }
                });
            }
        }
    }
}