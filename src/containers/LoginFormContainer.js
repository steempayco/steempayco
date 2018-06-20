import LoginForm from '../components/login/LoginForm';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = ({auth, common}) => {
    return {
        auth: common.auth,
        inProgress: auth.inProgress,
        error: auth.error,
        redirectToConfirm: auth.redirectToConfirm,
        userId: actions.getUserId()
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLoginRequest: (id, pass) => {
        actions.loginRequest(dispatch, id, pass);
    } 
})

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;