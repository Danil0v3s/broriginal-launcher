import React from 'react'
import { connect } from 'react-redux'

import icPrice from '../../imgs/shop_vend.png'

class AuctionItemDetail extends React.Component {

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

    render() {
        const { item: itemSelected } = this.props;
        return (
            <div className={`auction-info ${itemSelected ? 'active' : ''}`}>
                {
                    itemSelected && (
                        <>
                            <img src={`https://www.divine-pride.net/img/items/collection/iRO/${itemSelected.nameid}`} width={75} style={{ marginLeft: 'auto', marginRight: 'auto' }} alt="" />
                            <h4 style={{ marginBottom: 8 }}>[{itemSelected.nameid}] {itemSelected.item_name} +{itemSelected.refine}</h4>
                            <h5 style={{ marginBottom: 8, marginTop: 0 }}>{itemSelected.slots || 0} Slots</h5>
                            {this.renderCardsDetail(itemSelected)}
                            <span style={{ marginTop: 32, display: 'flex', alignContent: 'center' }}><img src={icPrice} style={{ marginRight: 4 }} alt="" />{Number(itemSelected.price).toLocaleString()}z</span>
                            <span style={{ marginTop: 'auto', fontSize: 12 }}>Vendas nas últimas 24h: 0</span>
                            <span style={{ fontSize: 12, marginBottom: 4 }}>Vendido por: {itemSelected.seller_name}</span>
                            <button onClick={() => this.setState({ itemSelected: undefined })}>Fechar</button>
                        </>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = ({ auction }) => {
    return {
        listings: auction.listings
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionItemDetail)