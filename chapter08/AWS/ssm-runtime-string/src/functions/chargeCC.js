'use strict';
const AWS = require('aws-sdk');
const ssm = new AWS.SSM();
const { PARAMETER_NAME } = process.env;
const params = {
    Name: PARAMETER_NAME,
    WithDecryption: false
};
module.exports.handler = (event, context, callback) => {
    return ssm
        .getParameter(params)
        .promise()
        .then((data) => {
            const apiKey = data.Parameter.Value;
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
