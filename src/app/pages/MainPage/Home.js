import React from 'react';
import { fetchAccountInfo } from '../../actions/HomeActions';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        fetchAccountInfo().then(res => {
            this.setState({ accountInfo: res.data })
        }).catch(error => {
            console.log('error', error)
        })
    }

    render() {
        const { accountInfo } = this.state
        if (!accountInfo) {
            return (
                <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <progress className="pure-material-progress-circular" />
                </div>
            )
        }

        return (
            <div style={{ display: 'flex', direction: 'column', height: '100%', width: '100%', padding: 16, boxSizing: 'border-box' }}>
                <p>Welcome back, {accountInfo.userid}</p>
            </div>
        )

    }
}