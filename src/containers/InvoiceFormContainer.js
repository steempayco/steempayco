import InvoiceForm from '../components/InvoiceForm';
import { connect } from 'react-redux';

const mapStateToProps = ({ common }) => {
    return { config: common.config };
};

const mapDispatchToProps = (dispatch) => ({
})

const InvoiceFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceForm);

export default InvoiceFormContainer;