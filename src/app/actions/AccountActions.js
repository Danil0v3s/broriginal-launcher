import history from '../components/History';
import axios from 'axios';

export const login = async (username, password) => {
    if (!username.length >= 4 && !password.length >= 4) {
        return
    }

    try {
        const { data } = await axios.post('account/login', { username, password });
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message)
        }
    }
}