import React from 'react';

import icUnfoldMore from './imgs/ic-unfold-more.svg';
import Input from '../../components/input/input';
import moment from 'moment';

export default class Auction extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content-body">
                <div className="auction">

                    {/* <div className="card" style={{ width: '95%', backgroundColor: 'white', marginBottom: 8, display: 'flex', flexDirection: 'column' }}>

                    </div> */}
                    <div className="card" style={{ width: '95%', backgroundColor: 'white', marginBottom: 8 }}>
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                            <div className="" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Input label="Item ID" secondary style={{ marginRight: 16 }} />
                                <Input label="Item name" secondary style={{ marginRight: 16 }} />
                                <Input label="Item type" secondary style={{ marginRight: 16 }} />
                                <Input label="Min. price" secondary style={{ marginRight: 16 }} />
                                <Input label="Max. price" secondary style={{ marginRight: 16 }} />
                            </div>
                            <img src={icUnfoldMore} />
                        </div>
                        <hr style={{ opacity: 0.2 }} />
                        <div className="auction-listing" style={{ marginTop: 24, marginBottom: 24 }}>
                            No items available for sale
                        </div>
                        <hr style={{ opacity: 0.2 }} />
                        <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'row', fontSize: 12 }}>
                            <span>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
                            <span>Vendas recentes: 0</span>
                            <span>Meus itens à venda: 0</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}