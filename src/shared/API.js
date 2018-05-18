const apiBase = 'https://05ngwbbeu3.execute-api.us-west-2.amazonaws.com/Prod';

let Api = {
    fetchInvoice: (invoiceId, onSuccess, onFail) => {
        let getPayment = `${apiBase}/invoice/${invoiceId}`;
        fetch(getPayment)
        .then(function(res){ return res.json(); })
        .then(function(data){ console.log(data); onSuccess(data); })
        .catch((err) => {
            onFail({errorMessage: "Failed to open invoice"})
        });
    },
    createInvoice: (payload, onSuccess, onFail) => {
        let fetchOption = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
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