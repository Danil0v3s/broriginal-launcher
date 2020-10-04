import io from 'socket.io-client';
import { ADD_AUCTION_ITEM, REMOVE_AUCTION_ITEM, SET_AUCTION_ERROR } from '../redux/auction/AuctionActionTypes';
let socket = undefined;
let interval = undefined;
let RETRY_INTERVAL = 5000;

const connect = url => {
    return io(url)
}

export const initSocket = token => {
    if (socket && socket.listeners('connect').length > 0) return;
    socket = connect(`http://localhost:3030?token=${token}`)
    socket.on('connect', () => {
        console.log('connected')
        clearInterval(interval);
        interval = undefined;
    })
    socket.on('disconnect', () => {
        if (interval) return;
        interval = setInterval(() => {
            socket = connect(`http://localhost:3030?token=${token}`);
            console.log('Retrying connection')
        }, RETRY_INTERVAL);
    });
    socket.on('connect_error', () => {
        if (interval) return;
        interval = setInterval(() => {
            socket = connect(`http://localhost:3030?token=${token}`);
            console.log('Retrying connection')
        }, RETRY_INTERVAL);
    })

}

export const subscribeToAuction = () => {
    return dispatch => {
        if (!socket || socket.listeners('auctionResponse').length > 0) return;
        socket.on('auctionResponse', (data) => {
            if (data.action) {
                switch (data.action) {
                    case 0xe03: dispatch(parseAuctionBuyResponse(data)); break;
                    case 0xe04: dispatch(parseAuctionRegisterResponse(data)); break;
                    default: break;
                }
            }
        });
        socket.emit('subscribeToAuction');
    }
}

const parseAuctionRegisterResponse = ({ data }) => {
    return dispatch => {
        dispatch({
            type: ADD_AUCTION_ITEM,
            payload: { item: data }
        })
    }
}

const parseAuctionBuyResponse = ({ exitCode, data }) => {
    return dispatch => {
        if (exitCode === 0) {
            dispatch({
                type: REMOVE_AUCTION_ITEM,
                payload: { auctionId: data.auctionId }
            })
        } else if (exitCode === 1) {
            dispatch({
                type: SET_AUCTION_ERROR,
                payload: { error: 'Você deve estar online com ao menos um personagem para poder comprar' }
            })
        } else if (exitCode === 2) {
            dispatch({
                type: SET_AUCTION_ERROR,
                payload: { error: 'Você não possui Zeny suficiente com o personagem online' }
            })
        } else if (exitCode === 3) {
            dispatch({
                type: SET_AUCTION_ERROR,
                payload: { error: 'Oops... Algo deu errado...' }
            })
        }
    }
}