import React from 'react';

import icPrice from './imgs/shop_vend.png'
import icCards from './imgs/card.png'
import icNoCards from './imgs/no_card.png'
import Input from '../../components/input/input';
import moment from 'moment';
import { fetchListings, bidAuction } from '../../actions/AuctionActions';
import { subscribeToAuction } from '../../actions/Socket';
import { connect } from 'react-redux';
import AuctionListing from './components/AuctionListing';
import AuctionListingItemDetail from './components/AuctionListingItemDetail';

class Auction extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listings: [],
            error: undefined
        }
    }

    componentDidMount() {
        this.fetchListings();
        subscribeToAuction((data) => {
            console.log(data)
            if (data.action) {
                switch (data.action) {
                    case 0xe03: this.parseAuctionBuyResponse(data); break;
                    case 0xe04: this.parseAuctionRegisterResponse(data); break;
                    default: break;
                }
            }
        });
    }

    parseAuctionRegisterResponse = ({ data }) => {
        const { listings } = this.state
        this.setState({ listings: [data, ...listings] })
    }

    parseAuctionBuyResponse = ({ exitCode, data }) => {
        if (exitCode === 0) {
            const { listings } = this.state
            this.setState({ listings: listings.filter(it => it.auction_id !== data.auctionId), itemSelected: undefined }, () => console.log(this.state))
        } else if (exitCode === 1) {
            alert('Você deve estar online com ao menos um personagem para poder comprar')
        } else if (exitCode === 2) {
            alert('Você não possui Zeny suficiente com o personagem online')
        } else if (exitCode === 3) {
            alert('Oops... Algo deu errado...')
        }
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
                                    <img src={`https://static.divine-pride.net/images/items/item/${card.id}.png`} height={24} alt="" />
                                    <span>{card.name}</span>
                                </div>
                            )
                        })
                    }
                </>
            )
        }
    }

    fetchListings() {
        fetchListings().then(res => {
            this.setState({ listings: res.data })
        }).catch(ex => {
            this.setState({ error: ex.message })
        });
    }

    buyAuction = async (auctionId) => {
        await bidAuction(auctionId);
    }

    removeAuction = async (auctionId) => {

    }

    render() {
        const { listings, itemSelected } = this.state
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
                            <AuctionListing />
                            <AuctionListingItemDetail item={itemSelected} />
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

const mapStateToProps = ({ listings }) => ({ listings })
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Auction)