import InvoiceForm from '../components/InvoiceForm';
import { connect } from 'react-redux';

const mapStateToProps = ({config}) => ({
    users: config.config.users,
    exchanges: config.config.exchanges,
});

const mapDispatchToProps = (dispatch) => ({
})

const InvoiceFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceForm);

export default InvoiceFormContainer;