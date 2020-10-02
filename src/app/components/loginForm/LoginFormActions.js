import axios from 'axios';

import { CLEAR_AUTH_ERROR, SET_AUTH_ERROR, SET_USER_INFO } from "../../redux/auth/AuthActionTypes";

export function doLogin({ username, password, isAuthenticated = false }) {
    return async dispatch => {
        if (!username || !password || username.length <= 4 || password.length <= 4) {
            return;
        }

        dispatch({ type: CLEAR_AUTH_ERROR });
        try {
            const { data } = await axios.post('account/login', { username, password });
            const userInfo = {
                username,
                isAuthenticated: true,
                token: data.token,
                accountId: data.account_id
            }
            dispatch({
                type: SET_USER_INFO,
                payload: userInfo
            });
        } catch (error) {
            if (error.response) {
                dispatch({
                    type: SET_AUTH_ERROR,
                    payload: { error: error.response.data.message }
                });
            }
        }
    }
}