const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const uuidv4 = require('uuid/v4');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.httpMethod == 'GET') {
        getInvoice(event, callback);
    } else if (event.httpMethod == 'POST') {
        createInvoice(event, callback)
    } else {
        console.log('Not supported event.');
    }
};

let createInvoice = (event, callback) => {
    var invoiceId = uuidv4().replace(/-/g, "");;
    var res ={
        "statusCode": 200,
        "headers": {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
        },
        "isBase64Encoded": false,
        "body": JSON.stringify({invoiceId: invoiceId})
    };
    
    var data = JSON.parse(event.body);
    data.invoiceId = invoiceId;
    data.timestamp = Date.now();
    
    var params = {
        Item: data,
        TableName: 'invoice'
    };

    docClient.put(params, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

let getInvoice = (event, callback) => {
    var invoiceId = event.pathParameters.invoiceId;
    var res ={
        "statusCode": 200,
        "headers": {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
        },
        "isBase64Encoded": false
    };
    if (!invoiceId) {
        callback(null, {"statusCode": 404});
    } else {
        var params = {
            Key: {
                invoiceId: invoiceId
            },
            TableName: 'invoice'
        };
        docClient.get(params, function(err, data) {
            console.log("data:" + data);
            if (err) {
                callback(null, {"statusCode": 500});
            } else if (!data.Item) {
                callback(null, {"statusCode": 404});
            } else {
                res.body = JSON.stringify(data.Item);
                callback(null, res);
            }
        });
    }
};