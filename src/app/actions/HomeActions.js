import axios from 'axios';

export const fetchAccountInfo = async () => {
    console.log(axios.defaults.headers.common)
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