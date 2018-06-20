const AWS = require('aws-sdk');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});
const uuidv4 = require('uuid/v4');


let fetch = require('node-fetch');
const currencyList = ['USD', 'JPY', 'GBP', 'KRW', 'PHP', 'EUR', 'MYR', 'CNY', 'AUD', 'NZD', 'THB', 'INR', 'IDR', 'VND', 'PLN', 'CAD'];
const cmcAPI = "https://api.coinmarketcap.com/v2/ticker/1312/?convert=";

const overrideKRW = () => {
    return fetch('https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-SBD&count=1&to')
            .then( res => res.json())
            .then( data => {
                return {price: Math.round((data[0].highPrice + data[0].lowPrice) / 2),
                    source: 'Upbit',
                    detail: 'Latest price' };
            })
            .catch(error => overrideKRW());
}

const fetchPriceData = () => {
    return Promise.all(
        currencyList.map(currency => fetch(`${cmcAPI}${currency}`))
    )
    .then((values) => Promise.all(values.map(value => value.json())))
    .then(prices => {
        let template = {
            coin: "SBD",
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
        return overrideKRW().then(priceInKRW => {
            collection.prices['KRW'] = priceInKRW;
            return collection;
        })
    })
    .catch(error => {
        console.log(error);
    });
};


exports.handler = async (event) => {
    var feedId = uuidv4().replace(/-/g, "");;

    const result = await fetchPriceData();
    console.log(result);
};


