zip -r feedAPI ./node_modules ./index.js ./src/*
aws s3 cp feedAPI.zip s3://steempay-code-lambda
