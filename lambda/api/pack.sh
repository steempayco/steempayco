zip -r steempayAPI ./node_modules ./index.js ./src/*
aws s3 cp steempayAPI.zip s3://steempay-code-lambda
