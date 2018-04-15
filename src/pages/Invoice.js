import React from 'react';
import './PageCommon.css'
import InvoiceForm from 'components/InvoiceForm'

const Invoice = () => {
    return (
        <div className="pageArea">
            <h2>
                Invoice
            </h2>
            <InvoiceForm />
        </div>
    );
};

export default Invoice;