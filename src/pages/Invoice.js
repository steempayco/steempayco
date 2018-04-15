import React from 'react';
import './PageCommon.css'
import InvoiceFormContainer from 'containers/InvoiceFormContainer'

const Invoice = () => {
    return (
        <div className="pageArea">
            <h2>
                Invoice
            </h2>
            <InvoiceFormContainer />
        </div>
    );
};

export default Invoice;