import React from 'react';
import Input from '../input/input'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { login as actionLogin } from '../../actions/AccountActions';

import icNext from './ic-next.svg'
import icNextGray from './ic-next-gray.svg'
import logo from './logo.png'
import { connect } from 'socket.io-client';
import { setUserInfo } from './LoginFormActions';

const ipcRenderer = window.require('electron').ipcRenderer

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}

        // ipcRenderer.on('download-progress', this.asynchronousMessageFromMain)
    }

    // asynchronousMessageFromMain = async (event, arg) => {
    //     if (!this.unmounted && this.mounted) {
    //         this.setState({ ...arg })
    //     }
    // }

    componentWillUnmount() {
        this.unmounted = true
        this.mounted = false
    }

    componentDidMount() {
        this.unmounted = false
        this.mounted = true
    }

    doLogin = async ({ username, password, isAuthenticated }) => {
        // if (username.length >= 4 && password.length >= 4 && !isAuthenticated) {
        //     this.setState({ error: undefined })
        //     actionLogin(username, password).then(res => {
        //         this.props.setUserInfo({ ...this.props.userInfo, isAuthenticated: true, token: res.token, account_id: res.account_id })
        //     }).catch(ex => {
        //         this.setState({ error: ex.message })
        //     });
        // }
    }

    isUserInfoValid = () => {
        return this.props.userInfo.username.length >= 4 && this.props.userInfo.password.length >= 4;
    }

    renderLoginButton = () => {
        const { userInfo } = this.props;
        return (
            <div className={`login-button ${this.isUserInfoValid() ? 'enabled' : 'disabled'}`}
                onClick={(event) => this.isUserInfoValid() ? this.doLogin(userInfo) : event.preventDefault()}>
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

    render() {
        const { userInfo, setUserInfo } = this.props;
        return (
            <div className="login-form" style={{ paddingTop: 30 }}>
                <img src={logo} width={100} style={{ marginLeft: 16, marginBottom: 30 }} alt=""/>
                <h2>Sign in with your bROriginal account</h2>
                <Input id="username" label="username" type="text" value={userInfo.username} onChange={(event) => setUserInfo({ ...userInfo, username: event.target.value })} />
                <Input id="password" label="password" type="password" value={userInfo.password} onChange={(event) => setUserInfo({ ...userInfo, password: event.target.value })} />
                {
                    this.state.error && <p style={{ color: 'red', marginLeft: 30, marginTop: 0, marginBottom: 0, fontSize: 14 }}>{this.state.error}</p>
                }

                <div style={{ marginTop: this.state.error ? 15 : 32, width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
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


const mapStateToProps = ({ userInfo }) => ({ userInfo })
const mapDispatchToProps = dispatch => ({
    setUserInfo: userInfo => dispatch(setUserInfo(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)