import LoginIcon from '../components/login/LoginIcon';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = ({auth}) => {
    return {auth: auth.auth, inProgress: auth.inProgress};
};

const mapDispatchToProps = (dispatch) => ({
    onLogoutRequest: () => {
        actions.logoutRequest()(dispatch);
    } 
})

const LoginPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginIcon);

export default LoginPanelContainer;