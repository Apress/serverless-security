'use strict';

const validRequestResponse = 'success';

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
