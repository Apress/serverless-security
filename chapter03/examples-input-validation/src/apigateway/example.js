'use strict';

const {WHITELISTED_IP} = process.env;
const invalidRequestResponse = {
    statusCode: 403,
    body: JSON.stringify({
        message: 'Invalid request'
    }),
};
const validRequestResponse = {
    statusCode: 200,
    body: 'success',
};

/**
 * @param {any} event
 * @param {any} context
 * @param {Function} callback
 */
module.exports.handler = (event, context, callback) => {
    // View the logs in CloudWatch
    console.log('Event', JSON.stringify(event));
    console.log('Context', JSON.stringify(context));

    // Example input validation 1
    if (event.httpMethod === 'GET' && event.body) {
        console.error('GET event body is not null');
        callback(null, invalidRequestResponse);
    }
    // Example input validation 2
    if (event.httpMethod === 'POST') {
        const {bodyKey1, bodyKey2} = JSON.parse(event.body || '{}');
        if (
            !bodyKey1 ||
            !bodyKey2 ||
            typeof (bodyKey1) !== 'string' ||
            typeof (bodyKey2) !== 'string' ||
            bodyKey1.length < 1 ||
            bodyKey1.length > 20 || 
            bodyKey2.length < 1 ||
            bodyKey2.length > 20 || 
            !bodyKey1.match(/^[a-zA-Z0-9]{1,20}$/) ||
            !bodyKey2.match(/^[a-zA-Z0-9]{1,20}$/)
        ) {
            console.error('POST event body has invalid inputs', `bodyKey1=${bodyKey1}`, `bodyKey2=${bodyKey2}`);
            callback(null, invalidRequestResponse);
        }
    }
    // Example input validation 3
    if (event.httpMethod === 'POST' && event.queryStringParameters) {
        console.error('POST event queryStringParameters is not null');
        callback(null, invalidRequestResponse);
    }
    // Example input validation 4
    if (event.httpMethod === 'GET') {
        const {testKey} = event.queryStringParameters || {};
        const {testKeyMulti} = event.multiValueQueryStringParameters | {};
        if (
            !event.queryStringParameters ||
            !testKey ||
            typeof(testKey) !== 'string' ||
            // check string length first to defend against ReDOS
            testKey.length < 1 ||
            testKey.length > 20 ||
            // check against a regular expression
            !testKey.match(/^[a-zA-Z0-9]{1,20}$/) ||
            testKeyMulti.length === 1
        ) {
            console.error('GET event queryStringParameters has an invalid input', `testKey=${testKey}`, `testKeyMulti=${JSON.stringify(testKeyMulti)}`);
            callback(null, invalidRequestResponse);
        }
    }
    // Example input validation 5
    if (event.requestContext.identity.sourceIp !== WHITELISTED_IP) {
        console.error('Execution only allowed for IP address', WHITELISTED_IP);
        callback(null, invalidRequestResponse);
    }
    // Send a response if input validation succeeds
    callback(null, validRequestResponse);
};
