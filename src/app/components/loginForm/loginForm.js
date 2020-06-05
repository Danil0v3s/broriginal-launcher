import React from 'react';
import Input from '../input/input'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import icNext from './ic-next.svg'
import icNextGray from './ic-next-gray.svg'
import logo from './logo.png'

const ipcRenderer = window.require('electron').ipcRenderer

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: { username: '', password: '' }
        }
        
        ipcRenderer.on('download-progress', this.asynchronousMessageFromMain)
    }

    asynchronousMessageFromMain = async (event, arg) => {
        if (!this.unmounted && this.mounted) {
            this.setState({ ...arg })
        }
    }

    componentWillUnmount() {
        this.unmounted = true
        this.mounted = false
    }

    componentDidMount() {
        this.unmounted = false
        this.mounted = true
    }

    doLogin = async ({ username, password }) => {
        await ipcRenderer.invoke('login', password, username);
    }

    isUserInfoValid = () => {
        return this.state.userInfo.username.length >= 4 && this.state.userInfo.password.length >= 4;
    }

    renderLoginButton = () => {
        const { userInfo } = this.state;
        return (
            <div className={`login-button ${this.isUserInfoValid() ? 'enabled' : 'disabled'}`}
                onClick={(event) => this.isUserInfoValid() ? this.doLogin(userInfo) : event.preventDefault()}>
                <img className="login-button-img" src={this.isUserInfoValid() ? icNext : icNextGray} height={24} />
            </div>
        )
    }

    renderButton = () => {
        const { downloadStatus } = this.state;
        if (downloadStatus && downloadStatus.loading && downloadStatus.progress) {
            return <Progress
                type="circle"
                percent={downloadStatus.progress}
                status=""
                width={56}
                strokeWidth={4} />
        } else {
            return this.renderLoginButton()
        }
    }

    render() {
        const { userInfo } = this.state;
        return (
            <div className="login-form" style={{ paddingTop: 30 }}>
                <img src={logo} width={100} style={{ marginLeft: 16, marginBottom: 30 }} />
                <h2>Sign in with your bROriginal account</h2>
                <Input id="username" label="username" type="text" value={userInfo.username} onChange={(event) => this.setState({ userInfo: { ...userInfo, username: event.target.value } })} />
                <Input id="password" label="password" type="password" value={userInfo.password} onChange={(event) => this.setState({ userInfo: { ...userInfo, password: event.target.value } })} />

                <div style={{ marginTop: 32, width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    {this.renderButton()}
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
}