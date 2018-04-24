import React from 'react';

import PaymentInject from 'components/PaymentInject'
import PaymentView from 'components/PaymentView'
import Utils from 'shared/Utils'
import './PageCommon.css'

const Payment = ({match}) => {
    return (
        <div>
            {match.params.id ? <PaymentView invoiceId={match.params.id} /> : <PaymentInject />}
        </div>
    );
};

export default Payment;