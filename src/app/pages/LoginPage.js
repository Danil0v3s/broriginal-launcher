import React from 'react';

import LoginForm from '../components/loginForm/LoginForm';
import ImageProgress from '../components/imageProgress/imageProgress';
import SettingsButton from '../components/settingsButton/settingsButton';

export default function LoginPage(props) {
    return (
        <div className="page-container">
            <LoginForm />
            <ImageProgress />
            <SettingsButton />
        </div>
    )
}