import { CLEAR_AUTH_ERROR, SET_AUTH_ERROR, SET_USER_INFO } from "./AuthActionTypes";

const initialState = {
    userInfo: {},
    error: undefined
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload.userInfo
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: undefined
            }
        default:
            return state
    }
}