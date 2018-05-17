const dbg_str = JSON.parse('{"receiver":"asbear","currency":"KRW","receiverDetail":{"account":"asbear"},"timestamp":1526542377256,"amount":"21323","memo":"123123","invoiceId":"3f017b29b9a044a9a6adf89f3193c2e7","type":"user"}');


let Api = {
    fetchInvoice: (invoiceId, onSuccess, onFail) => {
        let getPayment = "https://05ngwbbeu3.execute-api.us-west-2.amazonaws.com/Beta/invoice/" + invoiceId;
        console.log(getPayment);
        fetch(getPayment)
        .then(function(res){ return res.json(); })
        .then(function(data){ console.log(data); onSuccess(data); })
        .catch((err) => {
            onFail({errorMessage: "Failed to open invoice"})
        });
    },
    getPrice: (onSuccess, onFail) => {
        fetch("https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-SBD&count=30&to")
        .then(res => res.json())
        .then(onSuccess, onFail)
        .catch(onFail);
    },
}

export default Api;