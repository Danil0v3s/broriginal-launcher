import React from 'react';
import './App.css';
import TitleBar from './components/titleBar/titleBar'
import LoginForm from './components/loginForm/loginForm'

import ImageProgress from './components/imageProgress/imageProgress';
import SettingsButton from './components/settingsButton/settingsButton';

const ipcRenderer = window.require('electron').ipcRenderer

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
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

  render() {
    return (
      <div className="App">
        <div className="root">
          <TitleBar />
          <LoginForm downloadStatus={this.state.downloadStatus} />
          <ImageProgress />
          <SettingsButton />
        </div>
      </div>
    );
  }

}

// function App() {
  // const ipcRendererRef = useRef();
  // ipcRendererRef.current.invoke('app-loaded', {});
  // const ipcEventRef = useRef()

  // const [appState, updateAppState] = useState({});

  // console.log(ipcEventRef.current);


// }
