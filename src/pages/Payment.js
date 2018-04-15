import React from 'react';

import Scan from 'components/Scan'
import './PageCommon.css'

const Payment = () => {
    return (
        <div className="pageArea">
            <h2>
                Payment
            </h2>
            <Scan />
        </div>
    );
};

export default Payment;