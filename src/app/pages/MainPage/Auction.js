import React from 'react';

import icUnfoldMore from './imgs/ic-unfold-more.svg';
import Input from '../../components/input/input';
import moment from 'moment';
import { fetchListings } from '../../actions/AuctionActions';

export default class Auction extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listings: [],
            error: undefined
        }
    }

    componentDidMount() {
        fetchListings().then(res => {
            this.setState({ listings: res.data })
        }).catch(ex => {
            this.setState({ error: ex.message })
        });
    }

    renderListingsTable() {
        const cardInfo = entry => {
            if (entry.cardsOver) {
                return "Yes"
            } else {
                return "No cards"
            }
        }

        return this.state.listings.map(entry => {
            return (
                <div key={entry.auction_id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <img src={`https://www.divine-pride.net/img/items/item/iRO/${entry.nameid}`} />
                    <span>{entry.item_name}</span>
                    <span>{entry.price}</span>
                    <span>{cardInfo(entry)}</span>
                    <button>Comprar</button>
                </div>
            )
        })
    }

    render() {
        const { listings, error } = this.state
        return (
            <div className="content-body">
                <div className="auction">
                    <div className="card" style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                            <div className="" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Input label="Item ID" secondary style={{ marginRight: 16 }} />
                                <Input label="Item name" secondary style={{ marginRight: 16 }} />
                                <Input label="Min. price" secondary style={{ marginRight: 16 }} />
                                <Input label="Max. price" secondary style={{ marginRight: 16 }} />
                            </div>
                            <img src={icUnfoldMore} />
                        </div>
                        <div className="auction-listing" style={{ marginTop: 24, marginBottom: 24, overflow: 'auto' }}>
                            {
                                listings.length == 0 && "No items available for sale"
                            }
                            {
                                listings.length > 0 && (
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                        {
                                            this.renderListingsTable()
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'row', fontSize: 12, marginTop: 'auto' }}>
                            <span>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
                            <span>Vendas recentes: 0</span>
                            <span>Meus itens à venda: 0</span>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}