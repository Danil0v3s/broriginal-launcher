import axios from 'axios';

export const fetchAccountInfo = async () => {
    const { Authorization } = await axios.defaults.headers.common
    try {
        const { data } = await axios.get('account/info', { headers: { Authorization } });
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export const fetchAccountChars = async () => {
    const { Authorization } = await axios.defaults.headers.common
    try {
        const { data } = await axios.get('account/chars', { headers: { Authorization } });
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message)
        }
    }
}