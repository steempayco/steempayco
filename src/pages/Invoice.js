import React from 'react';
import './PageCommon.css'
import InvoiceFormContainer from 'containers/InvoiceFormContainer'
import InvoiceView from 'components/InvoiceView'

const Invoice = ({match}) => {
    return (
        <div className="pageArea">
            {match.params.id ? <InvoiceView invoiceId={match.params.id} /> : <InvoiceFormContainer />}
        </div>
    );
};

export default Invoice;