import { connect } from 'react-redux';
import * as actions from '../actions';
import LoginPanel from '../components/login/LoginPanel';

const mapStateToProps = ({auth}) => {
    return {auth: auth.auth, inProgress: auth.inProgress, loginStateChecked: auth.loginStateChecked};
};

const mapDispatchToProps = (dispatch) => ({
    onLogoutRequest: () => {
        actions.logoutRequest()(dispatch);
    } 
})

const LoginPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPanel);

export default LoginPanelContainer;