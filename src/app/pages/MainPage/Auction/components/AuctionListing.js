import React from 'react'
import { connect } from 'react-redux'

import icCards from '../../imgs/card.png'
import icNoCards from '../../imgs/no_card.png'
import { bidAuction } from '../AuctionActions'

class AuctionListing extends React.Component {

    removeAuction = async (auctionId) => {

    }

    hasCards(entry) {
        return entry.card0 instanceof Object || entry.card1 instanceof Object || entry.card2 instanceof Object || entry.card3 instanceof Object
    }

    renderListingsTable() {
        const cardInfo = entry => <img src={this.hasCards(entry) ? icCards : icNoCards} height={24} alt="" />
        return this.props.listings.map(entry => {
            return (
                <div key={entry.auction_id} className="auction-list-item" onClick={() => this.setState({ itemSelected: entry })}>
                    <img src={`https://www.divine-pride.net/img/items/item/iRO/${entry.nameid}`} height={32} style={{ marginLeft: 16 }} alt="" />
                    <span style={{ marginLeft: 16 }}>{entry.nameid} - {entry.item_name}</span>
                    <span style={{ marginLeft: 'auto', marginRight: 32 }}>+{entry.refine}</span>
                    <span style={{ marginRight: 32 }}>{entry.slots || 0} Slots</span>
                    <span style={{ marginRight: 32 }}>{cardInfo(entry)}</span>
                    <span style={{ marginRight: 32 }}>{Number(entry.price).toLocaleString()}z</span>
                    {
                        entry.account_id !== this.props.userInfo.accountId && <button style={{ width: 80 }} onClick={() => this.props.buyAuction(entry.auction_id)}>Comprar</button>
                    }
                    {
                        entry.account_id === this.props.userInfo.accountId && <button style={{ width: 80 }} onClick={() => this.removeAuction(entry.auction_id)}>Remover</button>
                    }
                </div>
            )
        })
    }

    render() {
        const { listings } = this.props;
        return (
            <div className="auction-listing">
                {
                    listings.length === 0 && "No items available for sale"
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
        )
    }
}

const mapStateToProps = ({ auction, auth }) => {
    return {
        listings: auction.listings,
        userInfo: auth.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buyAuction: auctionId => dispatch(bidAuction(auctionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionListing)