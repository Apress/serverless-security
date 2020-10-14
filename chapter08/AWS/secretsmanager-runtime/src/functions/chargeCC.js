'use strict';
const AWS = require('aws-sdk');
const secretsmanager = new AWS.SecretsManager();
const { SECRET_ID } = process.env;
const params = { SecretId: SECRET_ID };
module.exports.handler = (event, context, callback) => {
    return secretsmanager
        .getSecretValue(params)
        .promise()
        .then((data) => {
            const secret = JSON.parse(data.SecretString);
            const apiKey = secret.apiKey;
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
