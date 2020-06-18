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
                <div key={entry.auction_id} className="auction-list-item" onClick={() => this.setState({ itemSelected: entry })}>
                    <img src={`https://www.divine-pride.net/img/items/item/iRO/${entry.nameid}`} height={32} style={{ marginLeft: 16 }} />
                    <span style={{ marginLeft: 16 }}>{entry.item_name}</span>
                    <span style={{ marginLeft: 'auto', marginRight: 32 }}>+{entry.refine}</span>
                    <span style={{ marginRight: 32 }}>{entry.price}</span>
                    <span style={{ marginRight: 32 }}>{cardInfo(entry)}</span>
                    <button style={{ width: 80 }}>Comprar</button>
                </div>
            )
        })
    }

    render() {
        const { listings, error, itemSelected } = this.state
        return (
            <div className="content-body">
                <div className="auction">
                    <div className="card" style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', overflowX: 'hidden' }}>
                            <div className="auction-filters">
                                <Input label="Item ID" secondary style={{ marginRight: 16, marginBottom: 8 }} />
                                <Input label="Item name" secondary style={{ marginRight: 16, marginBottom: 8 }} />
                                <div style={{ flexDirection: 'row', display: 'flex', marginBottom: 8 }}>
                                    <Input label="Min. price" secondary style={{ marginRight: 16 }} />
                                    <Input label="Max. price" secondary style={{ marginRight: 16 }} />
                                </div>
                            </div>
                            <div className="auction-listing">
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
                            <div className={`auction-info ${itemSelected ? 'active' : ''}`}>
                                {
                                    itemSelected && (
                                        <>
                                            <img src={`https://www.divine-pride.net/img/items/collection/iRO/${itemSelected.nameid}`} width={75} style={{ marginLeft: 'auto', marginRight: 'auto' }} />

                                            <button style={{ marginTop: 'auto' }} onClick={() => this.setState({ itemSelected: undefined })}>Fechar</button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div className="card-footer">
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