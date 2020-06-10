import React from 'react';
import './App.css';
import TitleBar from './components/titleBar/titleBar';
import LoginPage from './pages/LoginPage';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from './components/History';
import MainPage from './pages/MainPage/MainPage';

const ipcRenderer = window.require('electron').ipcRenderer

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userInfo: { username: '', password: '', isAuthenticated: false }
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

  isLoggedIn() {
    return this.state.userInfo.isAuthenticated && this.state.userInfo.token !== undefined
  }

  setUserInfo = (userInfo) => {
    this.setState({ userInfo });
    if (this.isLoggedIn()) {
      history.replace('/')
    } else {
      history.replace('/login')
    }
  }

  render() {
    return (
      <div className="root">
        <Router history={history}>
          <TitleBar />
          <Switch>
            <Route path="/login">
              <LoginPage setUserInfo={this.setUserInfo} userInfo={this.state.userInfo} />
            </Route>
            <Route path="/">
              <MainPage userInfo={this.state.userInfo} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}