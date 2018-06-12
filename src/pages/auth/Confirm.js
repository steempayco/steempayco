import React from 'react';
import '../PageCommon.css'

import SignupConfirmContainer from 'containers/SignupConfirmContainer';

const Confirm = ({match}) => {
    return (
        <div className="responsiblePageArea">
            <SignupConfirmContainer />
        </div>
    );
};

export default Confirm;