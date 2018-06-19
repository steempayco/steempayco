import React from 'react';
import './PageCommon.css'
import SellFormContainer from 'containers/SellFormContainer'
import AuthContainer from 'containers/AuthContainer';


const Sell = ({match}) => {
    return (
        <div className="responsiblePageArea">
            <AuthContainer>
                {match.params.id ? <SellFormContainer storeId={match.params.id} /> : <SellFormContainer />}
            </AuthContainer>
        </div>
    );
};

export default Sell;