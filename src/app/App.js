import React from 'react';
import './App.css';
import TitleBar from './components/titleBar/titleBar'
import LoginForm from './components/loginForm/loginForm'

import ImageProgress from './components/imageProgress/imageProgress';
import SettingsButton from './components/settingsButton/settingsButton';

function App() {
  return (
    <div className="App">
      <div className="root">
        <TitleBar />
        <LoginForm />
        <ImageProgress />
        <SettingsButton />
      </div>
    </div>
  );
}

export default App;
