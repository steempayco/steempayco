import React from 'react';

import PaymentInject from 'components/PaymentInject'
import PaymentView from 'components/PaymentView'
import './PageCommon.css'

const Payment = ({match}) => {
    return (
        <div className="pageArea">
            {match.params.id ? <PaymentView invoiceId={match.params.id} /> : <PaymentInject />}
        </div>
    );
};

export default Payment;