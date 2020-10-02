import React from 'react';
import './App.css';
import TitleBar from './components/titleBar/titleBar';
import LoginPage from './pages/LoginPage';
import { Router, Switch, Route } from "react-router-dom";
import history from './components/History';
import MainPage from './pages/MainPage/MainPage';
import axios from 'axios';
import { connect } from 'react-redux';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:5131/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ipcRenderer = window.require('electron').ipcRenderer

class App extends React.Component {

  constructor(props) {
    super(props);

    // ipcRenderer.on('asynchronous-message', this.asynchronousMessageFromMain)
  }

  componentDidUpdate() {
    const { userInfo } = this.props;
    if (userInfo.token) {
      axios.defaults.headers.common['Authorization'] = userInfo.token;
    }
  }

  render() {
    return (
      <div className="root">
        <Router history={history}>
          <TitleBar />
          <Switch>
            <Route path="/main">
              <MainPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    userInfo: auth.userInfo
  }
}

export default connect(mapStateToProps)(App)