import InvoiceForm from '../components/InvoiceForm';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    users: state.config.users,
    exchanges: state.config.exchanges,
});

const mapDispatchToProps = (dispatch) => ({
})

const InvoiceFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceForm);

export default InvoiceFormContainer;