'use strict';

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

    // Send a response
    callback(null, validRequestResponse);
};
