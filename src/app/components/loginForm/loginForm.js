import React from 'react';
import Input from '../input/input'

import icNext from './ic-next.svg'
import logo from './logo.png'

export default function LoginForm() {
    return (
        <div className="login-form" style={{ paddingTop: 30 }}>
            <img src={logo} width={100} style={{ marginLeft: 16, marginBottom: 30 }} />
            <h2>Sign in with your bROriginal account</h2>
            <Input label="username" type="text" />
            <Input label="password" type="password" />
            <div className="login-button" style={{ height: 56, width: 56, backgroundColor: '#bf2626', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '30%', alignSelf: 'center', marginTop: 32 }}>
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