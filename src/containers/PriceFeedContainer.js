import * as actions from '../actions';
import { connect } from 'react-redux';
import { Component } from "react";

class PriceFetcher extends Component {
    constructor(props) {
        super(props);
        this.getPrice = this.getPrice.bind(this);
    }

    componentDidMount() {
        this.getPrice();
        setInterval(() => this.getPrice(), 10000);
    }

    getPrice() {
        fetch("https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-SBD&count=30&to")
        .then(res => res.json())
        .then(
            (result) => {
                var average = result.map((hr) => hr.highPrice).reduce((avg,e,i,arr)=>avg+e/arr.length,0);
                var date = new Date();
                this.props.onPriceFeed(
                    {
                        exchange: 'Upbit',
                        currency: 'KRW',
                        price: Math.round(average),
                        lastUpdate: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                    });
            },
            (error) => {
                console.log("Fail to check price. Critical Error! Please retry later." + error)
            })
        .catch((error) => {
            console.log("Fail to check price. Critical Error! Please retry later." + error)
        });
    }

    render() {
        return null;
    }
}

// store 안의 state 값을 props 로 연결해줍니다.
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    onPriceFeed: (feedData) => dispatch(actions.priceFeed(feedData))
})

const PriceFeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceFetcher);

export default PriceFeedContainer;