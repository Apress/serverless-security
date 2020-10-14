'use strict';

const rp = require('request-promise');
const {API_KEY} = process.env;
console.log('API_KEY:', API_KEY.replace(/\w/g, '*'));
const options = {
    url: 'https://creditcard.com/charge',
    method: 'post',
    body: {
        cardNum: '12345677890123456',
        amount: 3.14,
    },
    headers: {
        apiKey: API_KEY,
    },
    json: true,
    timeout: 1,
};
module.exports.handler = (event, context, callback) => {
    return rp(options)
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