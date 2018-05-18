"use strict";

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

let fetch = require('node-fetch');
const currencyList = ['USD', 'JPY', 'GBP', 'KRW', 'PHP', 'EUR', 'MYR', 'CNY'];
const cmcAPI = "https://api.coinmarketcap.com/v2/ticker/1312/?convert=";

const overrideKRW = () => {
    console.log("overrideKRW");
    return fetch('https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-SBD&count=1&to')
            .then( res => res.json())
            .then( data => {
                return {price: Math.round((data[0].highPrice + data[0].lowPrice) / 2),
                    source: 'Upbit',
                    detail: 'Latest price' };
            })
            .catch(error => this.overrideKRW());
}

const exchangeRate = {    
    fetchPriceData: () => {
        return Promise.all(
            currencyList.map(currency => fetch(`${cmcAPI}${currency}`))
        )
        .then((values) => Promise.all(values.map(value => value.json())))
        .then(prices => {
            let template = {
                coin: "SBD",
                time: Date.now(),
                prices: {}
            };
            let collection = template.prices;
            prices.forEach(price => {
                for (const [key, value] of Object.entries(price.data.quotes)) {
                    collection[key] = {price: value.price, source: 'coinmarketcap.com', detail: 'Lastest price on CoinMarketCap'}
                }
            })
            return template;
        })
        .then(collection => {
            return this.overrideKRW().then(priceInKRW => {
                collection.prices['KRW'] = priceInKRW;
                return collection;
            })
        })
        .catch(error => {
            console.log(error);
        })
    },
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
