import globalConfig from 'config'
import AuthHelper from './AuthHelper'

const apiBase = globalConfig.apiBase



let Api = {
    fetchInvoice: (invoiceId, onSuccess, onFail) => {
        let getPayment = `${apiBase}/invoice/${invoiceId}`;
        fetch(getPayment)
        .then(function(res){ return res.json(); })
        .then(function(data){ onSuccess(data); })
        .catch((err) => {
            onFail({errorMessage: "Failed to open invoice"})
        });
    },
    createInvoice: (payload, onSuccess, onFail) => {
        let fetchOption = {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': AuthHelper.getIdToken()},
            body: JSON.stringify(payload)
        };

        fetch(`${apiBase}/invoice`, fetchOption)
        .then((res) => res.json())
        .then(onSuccess, onFail)
        .catch(onFail);
    },
    getPrice: (onSuccess, onFail) => {
        fetch(`${apiBase}/price-feed`)
        .then(res => res.json())
        .then(onSuccess, onFail)
        .catch(onFail);
    },
}

export default Api;