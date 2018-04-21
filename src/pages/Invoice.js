import React from 'react';
import './PageCommon.css'
import InvoiceFormContainer from 'containers/InvoiceFormContainer'

const Invoice = () => {
    return (
        <div className="pageArea">
            <InvoiceFormContainer />
        </div>
    );
};

export default Invoice;