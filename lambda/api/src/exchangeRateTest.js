'use strict'

let exchangeRate = require('./exchangeRate');
exchangeRate.fetchPriceData().then((result) => console.log(result));