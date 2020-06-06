import React from 'react';

import LoginForm from '../components/loginForm/loginForm';
import ImageProgress from '../components/imageProgress/imageProgress';
import SettingsButton from '../components/settingsButton/settingsButton';

export default function LoginPage({ userInfo, setUserInfo }) {
    return (
        <div className="page-container">
            <LoginForm userInfo={userInfo} setUserInfo={setUserInfo} />
            <ImageProgress />
            <SettingsButton />
        </div>
    )
}