import React from 'react';
import './PageCommon.css'
import InvoiceFormContainer from 'containers/InvoiceFormContainer'
import InvoiceView from 'components/InvoiceView'
import AuthContainer from 'containers/AuthContainer';


const Invoice = ({ match }) => {
    return (
        <div className="responsiblePageArea">
            <AuthContainer>
                {match.params.id ? <InvoiceView invoiceId={match.params.id} /> : <InvoiceFormContainer />}
            </AuthContainer>
        </div>
    );
};

export default Invoice;