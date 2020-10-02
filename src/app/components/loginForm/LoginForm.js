import React from 'react';
import Input from '../input/input'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import icNext from './ic-next.svg'
import icNextGray from './ic-next-gray.svg'
import logo from './logo.png'
import { connect } from 'react-redux';
import { doLogin } from './LoginFormActions';

// const ipcRenderer = window.require('electron').ipcRenderer

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        // ipcRenderer.on('download-progress', this.asynchronousMessageFromMain)
    }

    isUserInfoValid = () => {
        const { username, password } = this.state;

        return username && password && username.length >= 4 && password.length >= 4;
    }

    renderLoginButton = () => {
        return (
            <div className={`login-button ${this.isUserInfoValid() ? 'enabled' : 'disabled'}`}
                onClick={this.handleLoginClick}>
                <img className="login-button-img" src={this.isUserInfoValid() ? icNext : icNextGray} height={24} alt="" />
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

    handleUsernameChange = event => {
        this.setState({ ...this.state, username: event.target.value });
        event.preventDefault();
    }

    handlePasswordChange = event => {
        this.setState({ ...this.state, password: event.target.value });
        event.preventDefault();
    }

    handleLoginClick = event => {
        const { username, password } = this.state;
        this.isUserInfoValid() ? this.props.doLogin({ username, password }) : event.preventDefault();
    }

    render() {
        const { username, password } = this.state;
        const { error } = this.props;
        return (
            <div className="login-form" style={{ paddingTop: 30 }}>
                <img src={logo} width={100} style={{ marginLeft: 16, marginBottom: 30 }} alt="" />
                <h2>Sign in with your bROriginal account</h2>
                <Input id="username" label="username" type="text" value={username} onChange={this.handleUsernameChange} />
                <Input id="password" label="password" type="password" value={password} onChange={this.handlePasswordChange} />
                {
                    error && <p style={{ color: 'red', marginLeft: 30, marginTop: 0, marginBottom: 0, fontSize: 14 }}>{error}</p>
                }

                <div style={{ marginTop: error ? 15 : 32, width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
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


const mapStateToProps = ({ auth }) => {
    return {
        userInfo: auth.userInfo,
        error: auth.error
    }
}
const mapDispatchToProps = dispatch => ({
    doLogin: userInfo => dispatch(doLogin(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)