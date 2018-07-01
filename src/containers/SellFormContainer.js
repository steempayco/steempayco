import SellForm from '../components/SellForm';
import { connect } from 'react-redux';

const mapStateToProps = ({ common }) => {
    return { config: common.config, username: common.auth.username };
};

const mapDispatchToProps = (dispatch) => ({
})

const SellFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SellForm);

export default SellFormContainer;