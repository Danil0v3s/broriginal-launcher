import axios from 'axios';

export const fetchListings = async () => {
    const { Authorization } = await axios.defaults.headers.common
    try {
        const { data } = await axios.get('auction/list', { headers: { Authorization } });
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export const bidAuction = async (auctionId) => {
    const { Authorization } = await axios.defaults.headers.common
    try {
        const { data } = await axios.post('auction/buy', { auctionId }, { headers: { Authorization } });
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message)
        }
    }
}