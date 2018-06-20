# Prod must be a clone of Beta
aws s3 sync s3://beta.steempay.co s3://steempay.co
aws cloudfront create-invalidation --distribution-id E2PVKL2UNCAH3D --paths "/*"
