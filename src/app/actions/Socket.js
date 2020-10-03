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
        const { listings } = this.state
        this.setState({ listings: [data, ...listings] })
    }
}

const parseAuctionBuyResponse = ({ exitCode, data }) => {
    return dispatch => {
        if (exitCode === 0) {
            const { listings } = this.state
            this.setState({ listings: listings.filter(it => it.auction_id !== data.auctionId), itemSelected: undefined }, () => console.log(this.state))
        } else if (exitCode === 1) {
            alert('Você deve estar online com ao menos um personagem para poder comprar')
        } else if (exitCode === 2) {
            alert('Você não possui Zeny suficiente com o personagem online')
        } else if (exitCode === 3) {
            alert('Oops... Algo deu errado...')
        }
    }
}