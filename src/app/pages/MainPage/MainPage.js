import React from 'react';
import history from '../../components/History';
import { Router, Switch, Route, Link } from "react-router-dom";

import NYANGPORING from './imgs/NYANGPORING.gif';
import icAccount from './imgs/ic-account.svg';
import icSettings from './imgs/ic-settings.svg';
import icStore from './imgs/ic-store.svg';
import icHome from './imgs/ic-home.svg';
import icNews from './imgs/ic-news.svg';
import bg from './imgs/bg.jpg';

import Home from './Home';
import Chars from './Chars';
import Auction from './Auction';

const NavIconButton = ({ img, path }) => {
    return (
        <Link to={path}>
            <div className="icon-btn">
                <img src={img} width={24} className="icon-btn ic" />
            </div>
        </Link>
    )
}

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.userInfo || !this.props.userInfo.isAuthenticated) {
            history.replace("/login")
        }
    }

    render() {
        return (
            <Router history={history}>
                <div className="page-container" style={{ backgroundColor: 'red', flexDirection: 'column', backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
                    <div className="layer" />
                    <div className="backdrop" />
                    <div className="main-nav-bar">
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 8, alignItems: 'center', marginLeft: 8 }}>
                            <img src={NYANGPORING} height={32} />
                            <p style={{ marginLeft: 8, fontWeight: 100, fontSize: 20, fontFamily: 'Fredoka One' }}>JOGAR</p>
                        </div>
                        <div className="main-nav-bar menu">
                            <NavIconButton img={icHome} path="/main/home" />
                            <NavIconButton img={icNews} path="/main/news" />
                            <NavIconButton img={icStore} path="/main/store" />
                            <NavIconButton img={icAccount} path="/main/account" />
                            <NavIconButton img={icSettings} path="/main/settings" />
                        </div>
                    </div>
                    <div className="main-content">
                        <Switch>
                            <Route path="/main/home">
                                <Home />
                            </Route>
                            <Route path="/main/news">
                                <p>NEWS</p>
                            </Route>
                            <Route path="/main/store">
                                <Auction />
                            </Route>
                            <Route path="/main/account">
                                <Chars />
                            </Route>
                            <Route path="/main/settings">
                                <p>SETTINGS</p>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }

}