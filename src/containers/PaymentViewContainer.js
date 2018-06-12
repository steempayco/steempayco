import PaymentView from '../components/PaymentView';
import { connect } from 'react-redux';

const mapStateToProps = ({config}) => {
    return {feed: config.feed};
};

const mapDispatchToProps = (dispatch) => ({
})

const PaymentViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentView);

export default PaymentViewContainer;