"use strict";

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});

const exchangeRate = {    
    getPriceFeed: (event, callback) => {
        var res = {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
            },
            "isBase64Encoded": false
        };
    
        var params = {
            Key: {
                priceFeedId: 'latest-price-feed'
            },
            TableName: 'priceFeed'
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
module.exports = exchangeRate;
