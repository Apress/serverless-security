'use strict';
const { API_KEY } = process.env;
module.exports.handler = (event, context, callback) => {
    console.log('API_KEY:', API_KEY.replace(/\w/g, '*'));
    callback(null, {
        statusCode: 200,
        body: 'Success'
    });
};
