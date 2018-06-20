import React from 'react';
import '../PageCommon.css'
import LoginFormContainer from 'containers/LoginFormContainer'

const Login = ({match}) => {
    return (
        <div className="responsiblePageArea">
            <LoginFormContainer />
        </div>
    );
};

export default Login;