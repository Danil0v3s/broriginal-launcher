import React, { useState } from 'react';
import Input from '../input/input'

import icNext from './ic-next.svg'
import logo from './logo.png'

const ipcRenderer = window.require('electron').ipcRenderer;

const doLogin = async ({ username, password }) => {
    const result = await ipcRenderer.invoke('login', password, username)
    console.log(result)
}

export default function LoginForm() {
    const [userInfo, setUserInfo] = useState({ username: '', password: '' });
    return (
        <div className="login-form" style={{ paddingTop: 30 }}>
            <img src={logo} width={100} style={{ marginLeft: 16, marginBottom: 30 }} />
            <h2>Sign in with your bROriginal account</h2>
            <Input label="username" type="text" value={userInfo.username} onChange={(event) => setUserInfo({ ...userInfo, username: event.target.value })} />
            <Input label="password" type="password" value={userInfo.password} onChange={(event) => setUserInfo({ ...userInfo, password: event.target.value })} />
            <div className="login-button"
                style={{ height: 56, width: 56, backgroundColor: '#bf2626', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '30%', alignSelf: 'center', marginTop: 32 }}
                onClick={() => doLogin(userInfo)}
            >
                <img className="login-button-img" src={icNext} height={24} />
            </div>
            <div className="login-form-help">
                <ul>
                    <li>Cadastre-se</li>
                    <li>Esqueceu a senha?</li>
                </ul>

            </div>
        </div >
    )
}