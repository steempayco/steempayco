import Exchange from 'resources/exchange.json'
import Currency from 'resources/currency.json'
import getSymbolFromCurrency from 'currency-symbol-map'


var Utils = {
    getExchange: () => {
        return Exchange;
    },
    getExchangeImage: (name) => {
        if (!name) return;
        return Exchange.find((item) => item.name === name).image;
    },
    getExchangeAccount: (name) => {
        return Exchange.find((item) => item.name === name).account;
    },
    getCurrencies: () => {
        return Currency.map(item => { return {...item, symbol: getSymbolFromCurrency(item.code)}});
    },
    getCurrencySymbol: (currencyCode) => {
        return getSymbolFromCurrency(currencyCode);
    },
    shortenNumber: (num, digits) => {
        var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
            decimal;

        for(var i=units.length-1; i>=0; i--) {
            decimal = Math.pow(1000, i+1);

            if(num <= -decimal || num >= decimal) {
                return +(num / decimal).toFixed(digits) + ' ' + units[i];
            }
        }
        return num;
    },
    vestToSp: (vest) => {
        return vest.split()[0].split('.')[0] / 2054.45;
    },
    b64EncodeUnicode: (str) => {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    },
    b64DecodeUnicode: (str) => {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    },
    getQueryVariable: (variable) => {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    },
    copyToClipboard: (str) => {
        // This is one way of copying
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    },
    getBaseUrl: () => {
        let loc = window.location;
        return loc.protocol + "//" + loc.hostname + (loc.port? ":"+loc.port : "") + "";
    },
    numberWithCommas: (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    currencyFormat: (value, code) => {
        let symbol = getSymbolFromCurrency(code);
        if (symbol.length > 1) {
            return `${Utils.numberWithCommas(value)} ${symbol}`;
        } else {
            return `${symbol}${Utils.numberWithCommas(value)}`;
        }
    }
};

export default Utils;
