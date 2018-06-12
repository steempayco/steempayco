import LoginForm from '../components/login/LoginForm';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = ({auth}) => {
    return {
        auth: auth.auth,
        inProgress: auth.inProgress,
        error: auth.error,
        redirectToConfirm: auth.redirectToConfirm,
        userId: actions.getUserId()
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLoginRequest: (id, pass) => {
        console.log(id, pass);
        actions.loginRequest(id, pass)(dispatch);
    } 
})

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;