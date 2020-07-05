import React from 'react';
import { fetchAccountChars } from '../../actions/HomeActions';

export default class Chars extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        fetchAccountChars().then(res => {
            this.setState({ chars: res.data })
        }).catch(error => {
            console.log('error', error)
        })
    }

    getCharsimUrl(char, sit) {
        let job = 0;
        if (char.class === 4060) {
            job = 5000
        } else if (char.class === 4061) {
            job = 5002
        } else if (char.class === 4062) {
            job = 5004
        } else if (char.class === 4063) {
            job = 5001
        } else if (char.class === 4064) {
            job = 5003
        }

        return `http://ro-character-simulator.ratemyserver.net/charsim.php?gender=${char.sex === "F" ? 0 : 1}&job=${job}&hair=${char.hair}&viewid=&location=&direction=0&action=${sit ? 2 : 1}&hdye=${char.hair_color}&dye=${char.clothes_color}&framenum=0&bg=0&cart=&mount=0&shield=0&weapon=0&animate=${sit ? 0 : 1}&rand=4330523`
    }

    render() {
        const { chars, hoverOn } = this.state
        if (!chars) {
            return (
                <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <progress className="pure-material-progress-circular" />
                </div>
            )
        }

        return (
            <div className="content-body">
                {
                    chars.map(char => {
                        return (
                            <div
                                key={char.char_id}
                                style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', flexDirection: 'column' }}>
                                <img
                                    onMouseOver={(event) => this.setState({ hoverOn: char.char_id })}
                                    src={this.getCharsimUrl(char, hoverOn !== char.char_id)} alt=""/>
                                <div style={{ backgroundColor: 'black', display: hoverOn === char.char_id ? 'flex' : 'none', flexDirection: 'column', flexWrap: 'wrap', width: '100%', color: 'white', boxSizing: 'border-box', padding: 8 }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <p style={{ display: 'unset', margin: 0 }}>Class: </p>
                                        <span>{char.class}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <p style={{ display: 'unset', margin: 0 }}>Base: {char.base_level}</p>
                                        <p style={{ display: 'unset', margin: 0 }}>Job: {char.job_level}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <p style={{ display: 'unset', margin: 0 }}>Str: {char.str}</p>
                                            <p style={{ display: 'unset', margin: 0 }}>Agi: {char.agi}</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <p style={{ display: 'unset', margin: 0 }}>Vit: {char.vit}</p>
                                            <p style={{ display: 'unset', margin: 0 }}>Int: {char.int}</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <p style={{ display: 'unset', margin: 0 }}>Dex: {char.dex}</p>
                                            <p style={{ display: 'unset', margin: 0 }}>Luk: {char.luk}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        )

    }
}