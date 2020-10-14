'use strict';
const AWS = require('aws-sdk');
const kms = new AWS.KMS();
const { ENCRYPTED_API_KEY } = process.env;
const params = {
    CiphertextBlob: ENCRYPTED_API_KEY
};
module.exports.handler = (event, context, callback) => {
    return kms
        .decrypt(params)
        .promise()
        .then((data) => {
            const apiKey = data.Plaintext;
            console.log('apiKey:', apiKey.replace(/\w/g, '*'));
            callback(null, {
                statusCode: 200,
                body: 'Success'
            });
        })
        .catch((err) => {
            console.error(err);
            callback(null, {
                statusCode: 500,
                body: 'Error'
            });
        });
};
