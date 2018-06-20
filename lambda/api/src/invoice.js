"use strict";

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});
const uuidv4 = require('uuid/v4');

const invoice = {
    createInvoice: (event, callback) => {
        var invoiceId = uuidv4().replace(/-/g, "");;
        var res ={
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*.steempay.co',
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
    },
    getInvoice: (event, callback) => {
        var invoiceId = event.pathParameters.invoiceId;
        var res ={
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*.steempay.co',
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
    }
};

module.exports = invoice;
