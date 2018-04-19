console.log("starting function");

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const uuidv4 = require('uuid/v4');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.httpMethod == 'GET') {
        getPaymentItem(event, callback);
    } else if (event.httpMethod == 'POST') {
        createPaymentItem(event, callback)
    } else {
        console.log('Not supported event.');
    }
};

let createPaymentItem = () => {
    var paymentId = uuidv4();
    var res ={
        "statusCode": 200,
        "headers": {
            "Content-Type": "*/*"
        },
        "isBase64Encoded": false,
        "body": JSON.stringify({paymentId: paymentId})
    };
    var params = {
        Item: event,
        TableName: 'payment'
    };
    params.Item.paymentId = paymentId;
    
    docClient.put(params, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

let getPaymentItem = (event, context, callback) => {
    var paymentId = event.pathParameters.paymentId;
    var res ={
        "statusCode": 200,
        "headers": {
            "Content-Type": "*/*"
        },
        "isBase64Encoded": false
    };
    if (!paymentId) {
        callback(null, {"statusCode": 404});
    } else {
        var params = {
            Key: {
                paymentId: paymentId
            },
            TableName: 'payment'
        };
        docClient.get(params, function(err, data) {
            console.log("data:" + data);
            if (err) {
                callback(null, {"statusCode": 500});
            } else if (!data.Item) {
                callback(null, {"statusCode": 404});
            } else {
                res.body = JSON.stringify(data);
                callback(null, res);
            }
        });
    }
};