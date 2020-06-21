import React from 'react';

import icPrice from './imgs/shop_vend.png'
import icCards from './imgs/card.png'
import icNoCards from './imgs/no_card.png'
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

    hasCards(entry) {
        return entry.card0 instanceof Object || entry.card1 instanceof Object || entry.card2 instanceof Object || entry.card3 instanceof Object
    }

    renderCardsDetail(entry) {
        if (this.hasCards(entry)) {
            return (
                <>
                    <h4 style={{ marginBottom: 8, marginTop: 8 }}>Cartas</h4>
                    {
                        [entry.card0, entry.card1, entry.card2, entry.card3, entry.card4].filter(card => card instanceof Object).map(card => {
                            return (
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src={`https://static.divine-pride.net/images/items/item/${card.id}.png`} height={24} />
                                    <span>{card.name}</span>
                                </div>
                            )
                        })
                    }
                </>
            )
        }
    }

    renderListingsTable() {
        const cardInfo = entry => <img src={this.hasCards(entry) ? icCards : icNoCards} height={24}/>

        return this.state.listings.map(entry => {
            return (
                <div key={entry.auction_id} className="auction-list-item" onClick={() => this.setState({ itemSelected: entry })}>
                    <img src={`https://www.divine-pride.net/img/items/item/iRO/${entry.nameid}`} height={32} style={{ marginLeft: 16 }} />
                    <span style={{ marginLeft: 16 }}>{entry.nameid} - {entry.item_name}</span>
                    <span style={{ marginLeft: 'auto', marginRight: 32 }}>+{entry.refine}</span>
                    <span style={{ marginRight: 32 }}>{entry.slots || 0} Slots</span>
                    <span style={{ marginRight: 32 }}>{cardInfo(entry)}</span>
                    <span style={{ marginRight: 32 }}>{Number(entry.price).toLocaleString()}z</span>
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
                                            <h4 style={{ marginBottom: 8 }}>[{itemSelected.nameid}] {itemSelected.item_name} +{itemSelected.refine}</h4>
                                            <h5 style={{ marginBottom: 8, marginTop: 0 }}>{itemSelected.slots || 0} Slots</h5>
                                            {this.renderCardsDetail(itemSelected)}
                                            <span style={{ marginTop: 32, display: 'flex', alignContent: 'center' }}><img src={icPrice} style={{ marginRight: 4 }} />{Number(itemSelected.price).toLocaleString()}z</span>
                                            <span style={{ marginTop: 'auto', fontSize: 12 }}>Vendas nas últimas 24h: 0</span>
                                            <span style={{ fontSize: 12, marginBottom: 4 }}>Vendido por: {itemSelected.seller_name}</span>
                                            <button onClick={() => this.setState({ itemSelected: undefined })}>Fechar</button>
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