import InvoiceForm from '../components/InvoiceForm';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    users: state.config.users,
    exchanges: state.config.exchanges,
    feed: state.feed
});

const mapDispatchToProps = (dispatch) => ({
})

const InvoiceFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceForm);

export default InvoiceFormContainer;