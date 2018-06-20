const invoice = require('./src/invoice')
const exchangeRate = require('./src/exchangeRate')

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.resource.startsWith('/invoice')) {
        if (event.httpMethod == 'GET') {
            invoice.getInvoice(event, callback);
        } else if (event.httpMethod == 'POST') {
            invoice.createInvoice(event, callback)
        } else {
            console.log('Not supported event.');
        }
    } else if (event.resource == '/price-feed') {
        if (event.httpMethod == 'GET') {
            exchangeRate.getPriceFeed(event, callback);
        } else {
            console.log('Not supported event.');
        }
    }
};
