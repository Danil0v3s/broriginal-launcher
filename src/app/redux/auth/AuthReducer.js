import { SET_USER_INFO } from "./AuthActionTypes";

const initialState = {
    userInfo: undefined
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload.userInfo
            }
        default:
            return state
    }
}