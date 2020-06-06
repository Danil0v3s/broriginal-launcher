import React from 'react';
import './App.css';
import TitleBar from './components/titleBar/titleBar';
import LoginPage from './pages/LoginPage';

import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import history from './components/History';
import MainPage from './pages/MainPage/MainPage';

const ipcRenderer = window.require('electron').ipcRenderer

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userInfo: { username: '', password: '', isAuthenticated: false, login: this.login, logout: this.logout }
    }
    ipcRenderer.on('asynchronous-message', this.asynchronousMessageFromMain)
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

  setUserInfo = (userInfo) => {
    this.setState({ ...userInfo });
  }

  login = () => {
    const { userInfo } = this.state;
    if (userInfo.username.length >= 4 && userInfo.password.length >= 4 && !userInfo.isAuthenticated) {
      this.setState({ userInfo: { ...userInfo, isAuthenticated: true } })
      history.push('/')
    }
  }

  logout = () => {
    const { userInfo } = this.state;
    if (userInfo.isAuthenticated) {
      this.setState({ userInfo: { ...userInfo, isAuthenticated: false } })
    }
  }

  render() {
    return (
      <div className="root">
        <Router history={history}>
          <TitleBar />
          <Switch>
            {/* <Route path="/login">
              <LoginPage setUserInfo={this.setUserInfo} userInfo={this.state.userInfo} />
            </Route> */}
            <Route path="/" userInfo={this.state.userInfo}>
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}