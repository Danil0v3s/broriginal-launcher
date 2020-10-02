import { SET_USER_INFO } from "../../redux/auth/AuthActionTypes"

export function setUserInfo(userInfo) {
    return dispatch => {
        dispatch({
            type: SET_USER_INFO,
            payload: { userInfo }
        })
    }
}

export function doLogin() {
    
}