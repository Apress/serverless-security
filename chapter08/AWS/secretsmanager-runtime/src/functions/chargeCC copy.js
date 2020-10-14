'use strict';

const rp = require('request-promise');
const AWS = require('aws-sdk');
const secretsmanager = new AWS.SecretsManager();
const {SECRET_ID} = process.env;
const params = {SecretId: SECRET_ID};
const options = {
    url: 'https://creditcard.com/charge',
    method: 'post',
    body: {
        cardNum: '12345677890123456',
        amount: 3.14,
    },
    headers: {},
    json: true,
    timeout: 1,
};
module.exports.handler = (event, context, callback) => {
    return secretsmanager.getSecretValue(params).promise()
        .then((data) => {
            const secret = JSON.parse(data.SecretString);
            options.headers.apiKey = secret.apiKey;
            console.log('apiKey:', options.headers.apiKey.replace(/\w/g, '*'));
            return rp(options);
        })
        .then(() => {
            console.log('success');
            callback(null, {
                statusCode: 200,
                body: 'Processed',
            });
        })
        .catch((err) => {
            console.error(err);
            callback(null, {
                statusCode: 500,
                body: 'Could not process payment.',
            });
        });
};