import React from 'react';
import icSettings from './ic-settings.svg';

const electron = window.require('electron');

const style = {
    height: 32,
    width: 32,
    backgroundColor: '#767676',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 16,
    bottom: 16
}

export default function SettingsButton() {
    return (
        <div style={style} onClick={() => electron.remote.getCurrentWindow().openDevTools()}>
            <img src={icSettings} height={20} width={20} alt=""/>
        </div>
    )
}