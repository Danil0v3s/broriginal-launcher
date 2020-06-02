import React from 'react';
import './App.css';
import TitleBar from './components/titleBar/titleBar'
import LoginForm from './components/loginForm/loginForm'
import icSettings from './ic-settings.svg'

function App() {
  return (
    <div className="App">
      <div className="root">
        <TitleBar />
        <LoginForm />
        <div style={{ height: 32, width: 32, backgroundColor: '#767676', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, position: 'absolute', right: 16, bottom: 16 }}>
          <img src={icSettings} height={20} width={20} />
        </div>
      </div>
    </div>
  );
}

export default App;
