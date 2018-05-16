import PaymentView from '../components/PaymentView';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    feed:
    [
        {
            currency: 'USD',
            exchange: 'Bittrex',
            price: 2.73,
            lastUpdate: 'data time'
        },
        {
            currency: 'KRW',
            exchange: 'Upbit',
            price: 2700,
            lastUpdate: 'data time'
        }
    ]
});

const mapDispatchToProps = (dispatch) => ({
})

const PaymentViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentView);

export default PaymentViewContainer;