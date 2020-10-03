import { SET_DOWNLOAD_STATUS } from "../redux/MainActionTypes"

const ipcRenderer = window.require('electron').ipcRenderer

export function initializeElectronIPCMessaging() {
    return async (dispatch, getState) => {
        // ipcRenderer.on('asynchronous-message', this.asynchronousMessageFromMain)
        ipcRenderer.on('download-progress', (event, args) => {
            dispatch({
                type: SET_DOWNLOAD_STATUS,
                payload: { ...args }
            })
        })
    }
}