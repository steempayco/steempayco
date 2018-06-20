import * as actions from '../actions';
import { connect } from 'react-redux';
import { Component } from "react";
import Api from 'shared/API';

class PriceFetcher extends Component {
    componentDidMount() {
        Api.getPrice(this.onPrice, this.onError);
        setInterval(() => Api.getPrice(this.onPrice, this.onError), 30000);
    }

    onPrice = (result) => {
        this.props.onPriceFeed(result);
    }

    onError = (error) => {
        console.log("Fail to check price. Critical Error! Please retry later." + error)
    }

    render() {
        return null;
    }
}

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