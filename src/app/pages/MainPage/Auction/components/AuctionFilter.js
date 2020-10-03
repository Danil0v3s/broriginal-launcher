import React from 'react'
import { connect } from 'react-redux'

class AuctionFilter extends React.Component {

    render() {
        return (
            <div className="auction-filters">
                <Input label="Item ID" secondary style={{ marginRight: 16, marginBottom: 8 }} />
                <Input label="Item name" secondary style={{ marginRight: 16, marginBottom: 8 }} />
                <div style={{ flexDirection: 'row', display: 'flex', marginBottom: 8 }}>
                    <Input label="Min. price" secondary style={{ marginRight: 16 }} />
                    <Input label="Max. price" secondary style={{ marginRight: 16 }} />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuctionFilter)