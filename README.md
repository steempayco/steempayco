# Steem Pay

![KakaoTalk_Photo_2018-04-26-22-42-19.jpeg](https://steemitimages.com/DQmQ5haGKQEyFPNxYL6VyDyZEYrKPiwf1yWpcbEUuRf6CdM/KakaoTalk_Photo_2018-04-26-22-42-19.jpeg)

I am introducing a new web app **SteemPay** that aims to help people to use SBD for selling and buying the real stuff. The primary mission of this tool is to simplify the selling and buying process using SBD.

Using SteemPay, you can create an invoice quickly, and the buyer can pay it by scanning QR code. You can also get paid without any Steem account if you have a Steem wallet in Upbit or Bittrex.

Although SteemPay only supports KRW currency for now, you can try out just for fun.
https://steempay.co

## Motivation

Korean Steemians who owns their own offline stores like pubs, restaurants or clinics have been trying to receive SBD for their products and services. However it was not as simple as they thought because:

- Converting the local currency KRW to SBD is a burden, and the exchange rate changes second by second
- No one step way for sellers and buyers to create and share an invoice
- Sellers and buyers must go through the manual processes for the payment, putting numbers by numbers
- no clear and unified way to keep the track of the transactions

**Here is the scenario of selling a cup of coffee for SBD.**
1. Seller calculates the SBD price of the product
2. Seller gives the number like 1.352 SBD to the buyer
3. Buyer opens whatever Steem app he uses and manually puts the seller's account ID and the price
4. Buyer also needs to put some memo about what he is paying the money for.
4. Put active key if neeeded.
5. Seller needs to check if buyer paid that amount.
6. Found any mistake in the processes above? sigh... 

SteemPay project was born to simplify this process, and has been making a great progress in his mission although it is still in its very early stage. SteemPay is now perfectly usable in Korea, and some Steemians are using it for their business already.

---

I will now walk you through what it does for the sellers and buyers currently.

# Main page
This web app is currently not responsible but dedicated for mobile devices. There is a button to open and close the sidebar in which there are some buttons to move around the features.

![](https://steemitimages.com/DQmTHeipWbUwhDTjPPVFGivfKjdvZci9HGLLdJwSLmQVx6d/Screen%20Shot%202018-04-26%20at%2022.44.08.png)
![](https://steemitimages.com/DQmPdV36EWTuEdJyofDcB5YBDkBQVc29ScsUMNRnYpBWAnL/Screen%20Shot%202018-04-26%20at%2022.44.14.png)

# Setting
Seller must setup their Steem accounts and exchange accounts in order to generate an invoice. Once it's done, seller can simply choose which account they want to receive the payment to. You must click "Save" as now it does not do auto save.

<table>
<tr>
<td>![](https://steemitimages.com/DQmVQBDm7Kvm4QmzHfBBGRZNszEXVFcxmZRbZZRd5VoFnb9/Screen%20Shot%202018-04-26%20at%2022.54.16.png)</td>
<td>https://steemitimages.com/DQmUx3ExGwwzc84gkhHcBecA1m5qX8vWZu2AjKPqDDbrUyj/Screen%20Shot%202018-04-26%20at%2022.54.27.png</td>
</tr>
<tr>
<td>https://steemitimages.com/DQmY5PJ1WE9RwmwQ6P8wATQioHSTcAF8Kxr39apFeNY7yaa/Screen%20Shot%202018-04-26%20at%2022.54.45.png</td>
<td>https://steemitimages.com/DQmWKzLR6N72YrrBj8roS6iN5q8FFvY7a1r1Jszp2LEXSBU/Screen%20Shot%202018-04-26%20at%2022.54.52.png</td>
</tr>
</table>

# Invoice
You can create an invoice by putting the price in the local currency (now only KRW) and choosing the account. You can see the exchange rate is automatically fetched and applied to the KRW to SBD conversion. 

Once all the required fields are filled, you can click "Create Invoice" to generate the invoice with a QR code. This invoice can directly scanned using any kind of QR code scanner, or also can be shared with the other people through many other ways.

<table>
<tr>
<td>https://steemitimages.com/DQmUAEjP9tNYTuE1qFUpAnqa7ZcUkCZcjSGXf4tt2Xy3onm/Screen%20Shot%202018-04-26%20at%2023.02.20.png</td>
<td>https://steemitimages.com/DQmZCBbGjjL55e9rrPuPcNx13Zz2bDo9x9ZwARYVMJnPsTZ/Screen%20Shot%202018-04-26%20at%2023.02.32.png</td>
</tr>
</table>

At the moment the local currency is immediately converted to SBD and fixed to that value forever. However I am considering to add the opposite way of applying the exchange rate which is fixed to local currency and then converted when the payment is made. Both are necessary for the different types of businesses.

# Payment
You can scan the QR code in the invoice to make a payment. A QR code reader is embedded into the web app for Android devices, but you can use your favourite QR code reader as well.

iPhone users can use their camera app to scan the QR code. It is very obvious and easy.

<table>
<tr><td>https://steemitimages.com/DQmY64Lq6Jp2s5JxkKQZUn3DmnkWjpetVkgVDWhrrDitaNr/Screen%20Shot%202018-04-26%20at%2023.09.21.png</td>
<td>https://steemitimages.com/DQmWeTUFHNqi1AjK49Nb6byGPKbWtpFKhy72sJ3z4XE8uhM/Screen%20Shot%202018-04-26%20at%2023.09.47.png</td></tr>
</table>

If you click "Pay via SteemConnect", you are redirected to SteemConnect. For the first time, you will be asked to put the private active key. If you did make your browser save your active key before, you will not need to put it again.


# Used technology stack
NodeJS, Webpack, Javascript, HTML, ReactJs, ReactRedux, ReactRouter,  Semantic UI React, AWS EC2,  API Gateway, Lambda, Dynamo DB, etc

# Future Work
Although SteemPay is functioning, it is still in its prototype phase. There is very long to-do list but I will not share everything here. The items on the top of the list are:
- Supporting USD currency
- More detail configuration for sellers
- Introducing permanent invoice
- Authentication

Although this project will be driven by the feedback from KR community, as they are actually using it for their real business, any feedback from non-KR will be really appreciated.

I deliver incrementally and work backward with the feedback. Therefore this project will be progressing quickly towards the right direction.

# Open Source
SteemPay is an open source project.
https://github.com/ianpark/steempay

# Please Support SteemPay project
You can support this project by various ways.

1. Vote @asbear as a witness. You need to manually put my account because I am 57th now.
https://steemit.com/~witnesses

2. Vote and resteem this post

3. Follow me :)

Many thanks!
