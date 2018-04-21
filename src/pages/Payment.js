import React from 'react';

import PaymentComponent from 'components/PaymentComponent'
import Utils from 'shared/Utils'
import './PageCommon.css'

const Payment = () => {
    let paymentId = Utils.getQueryVariable("q");
    return (
        <div className="pageArea">
            <h2>
                Payment
            </h2>
            
            <PaymentComponent paymentId={paymentId} />
        </div>
    );
};

export default Payment;