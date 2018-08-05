import globalConfig from "config";
import AuthHelper from "./AuthHelper";

const apiBase = globalConfig.apiBase;

const baseFetchOption = {};

let Api = {
  fetchInvoice: (invoiceId, onSuccess, onFail) => {
    let getPayment = `${apiBase}/invoice/${invoiceId}`;
    fetch(getPayment, baseFetchOption)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        onSuccess(data);
      })
      .catch(err => {
        onFail({ errorMessage: "Failed to open invoice" });
      });
  },
  createInvoice: (payload, onSuccess, onFail) => {
    let fetchOption = {
      ...baseFetchOption,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthHelper.getIdToken()
      },
      body: JSON.stringify(payload)
    };

    fetch(`${apiBase}/invoice`, fetchOption)
      .then(res => res.json())
      .then(onSuccess, onFail)
      .catch(onFail);
  },
  getPrice: (onSuccess, onFail) => {
    fetch(`${apiBase}/price-feed`, baseFetchOption)
      .then(res => res.json())
      .then(onSuccess, onFail)
      .catch(onFail);
  },
  getStores: (onSuccess, onFail) => {
    const storeInfo = {
      timestamp: new Date().getTime(),
      version: "1",
      stores: [
        {
          store_id: "1",
          name: "선유기지",
          photo_urls: ["http://quoteslab.kr/wordpress/wp-content/uploads/2017/03/%EC%84%A0%EC%9C%A0%EA%B8%B0%EC%A7%80_1_m.jpg"], // first one will be shown
          website: "https://www.instagram.com/seonyu_base/",
          currency: "KRW",
          description: "선유기지입니다. 커피 및 대관 가능합니다. 스팀달러로 결제가 가능합니다.",
          category: ["cafe", "restaurant"],
          address: "서울시 어디 저기저거 거기 13-1",
          contact_number: "02-222-1111",
          latitude: 37.390371, 
          longitude: 126.962441
        },
        {
          store_id: "2",
          name: "Jamie's Italian",
          photo_urls: [""], // first one will be shown
          website: "https://www.instagram.com/jamie/",
          currency: "GBP",
          description: "",
          category: ["restaurant"],
          address: "3 London, E2S30, United Kingdom",
          contact_number: "020-23232-32342",
          longitude: -54.404945,
          latitude: -22.202924
        }
      ]
    };
    onSuccess(storeInfo);
  }
};

export default Api;
