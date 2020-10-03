import React from 'react';

import icPrice from './imgs/shop_vend.png'
import icCards from './imgs/card.png'
import icNoCards from './imgs/no_card.png'
import Input from '../../components/input/input';
import moment from 'moment';
import { fetchListings, bidAuction } from '../../actions/AuctionActions';
import { subscribeToAuction } from '../../../actions/Socket';
import { connect } from 'react-redux';
import AuctionListing from './components/AuctionListing';
import AuctionItemDetail from './components/AuctionItemDetail';

class Auction extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listings: [],
            error: undefined
        }
    }

    componentDidMount() {
        this.initialize();
    }

    initialize() {
        this.fetchListings();
        this.props.subscribeToAuction();
    }

    hasCards(entry) {
        return entry.card0 instanceof Object || entry.card1 instanceof Object || entry.card2 instanceof Object || entry.card3 instanceof Object
    }

    fetchListings() {
        fetchListings().then(res => {
            this.setState({ listings: res.data })
        }).catch(ex => {
            this.setState({ error: ex.message })
        });
    }

    render() {
        const { listings, itemSelected } = this.state
        return (
            <div className="content-body">
                <div className="auction">
                    <div className="card" style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', overflowX: 'hidden' }}>
                            <AuctionFilter />
                            <AuctionListing />
                            <AuctionItemDetail item={itemSelected} />
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
    subscribeToAuction: dispatch(subscribeToAuction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Auction)