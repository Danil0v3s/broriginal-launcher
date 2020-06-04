import React, { useState, useEffect } from 'react';
import Input from '../input/input'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import icNext from './ic-next.svg'
import logo from './logo.png'

const ipcRenderer = window.require('electron').ipcRenderer;

const doLogin = async ({ username, password }) => {
    const result = await ipcRenderer.invoke('login', password, username)
    console.log(result)
}

export default function LoginForm({ downloadStatus }) {
    // console.log(downloadStatus && downloadStatus.progress)
    const [userInfo, setUserInfo] = useState({ username: '', password: '' });

    const renderLoginButton = () => {
        return (
            <div className="login-button"
                style={{ height: 56, width: 56, backgroundColor: '#bf2626', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '30%' }}
                onClick={() => doLogin(userInfo)}>
                <img className="login-button-img" src={icNext} height={24} />
            </div>
        )
    }

    const renderButton = () => {
        if (downloadStatus && downloadStatus.loading && downloadStatus.progress) {
            return <Progress
                type="circle"
                percent={downloadStatus.progress}
                status=""
                width={56}
                strokeWidth={4} />
        } else {
            return renderLoginButton()
        }
    }

    return (
        <div className="login-form" style={{ paddingTop: 30 }}>
            <img src={logo} width={100} style={{ marginLeft: 16, marginBottom: 30 }} />
            <h2>Sign in with your bROriginal account</h2>
            <Input label="username" type="text" value={userInfo.username} onChange={(event) => setUserInfo({ ...userInfo, username: event.target.value })} />
            <Input label="password" type="password" value={userInfo.password} onChange={(event) => setUserInfo({ ...userInfo, password: event.target.value })} />

            <div style={{ marginTop: 32, width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                {renderButton()}
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