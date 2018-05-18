import * as actions from '../actions';
import { connect } from 'react-redux';
import { Component } from "react";
import Api from 'shared/Api';

class PriceFetcher extends Component {
    componentDidMount() {
        Api.getPrice(this.onPrice, this.onError);
        setInterval(() => Api.getPrice(this.onPrice, this.onError), 10000);
    }

    onPrice = (result) => {
        var date = new Date();
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