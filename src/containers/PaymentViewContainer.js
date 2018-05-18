import PaymentView from '../components/PaymentView';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {feed: state.feed};
};

const mapDispatchToProps = (dispatch) => ({
})

const PaymentViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentView);

export default PaymentViewContainer;