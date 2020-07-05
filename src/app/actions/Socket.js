import io from 'socket.io-client';
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

export const subscribeToAuction = (callback) => {
    if (!socket || socket.listeners('auctionResponse').length > 0) return;
    socket.on('auctionResponse', (data) => {
        callback(data);
    });
    socket.emit('subscribeToAuction');
}