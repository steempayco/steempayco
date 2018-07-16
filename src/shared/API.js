import globalConfig from 'config'
import AuthHelper from './AuthHelper'

const apiBase = globalConfig.apiBase

const devMode = globalConfig.stage === 'dev' ? true : false;
const baseFetchOption = devMode ? {mode: 'no-cors'} : {};

let Api = {
    fetchInvoice: (invoiceId, onSuccess, onFail) => {
        let getPayment = `${apiBase}/invoice/${invoiceId}`;
        fetch(getPayment, baseFetchOption)
            .then(function (res) { return res.json(); })
            .then(function (data) { onSuccess(data); })
            .catch((err) => {
                onFail({ errorMessage: "Failed to open invoice" })
            });
    },
    createInvoice: (payload, onSuccess, onFail) => {
        let fetchOption = {
            ...baseFetchOption,
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': AuthHelper.getIdToken() },
            body: JSON.stringify(payload)
        };

        fetch(`${apiBase}/invoice`, fetchOption)
            .then((res) => res.json())
            .then(onSuccess, onFail)
            .catch(onFail);
    },
    getPrice: (onSuccess, onFail) => {
        fetch(`${apiBase}/price-feed`, baseFetchOption)
            .then(res => res.json())
            .then(onSuccess, onFail)
            .catch(onFail);
    },
}

export default Api;