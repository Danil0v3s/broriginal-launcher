import React from 'react';
import icClose from './ic-close.svg';

const electron = window.require('electron');

const minimize = (event) => {
  var window = electron.remote.getCurrentWindow();
  window.minimize();
}

const close = (event) => {
  var window = electron.remote.getCurrentWindow();
  window.close();
}

export default function TitleBar() {
  return (
    <div className="titlebar">
      <div className="titlebar-btn minimize" onClick={minimize}>
        <div>_</div>
      </div>
      <div className="titlebar-btn close" onClick={close}>
        <img src={icClose} height={16} width={16} alt="" />
      </div>
    </div>
  )
}