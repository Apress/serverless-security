'use strict';

const {WHITELISTED_IP, BUCKET_NAME} = process.env;
const validRequestResponse = 'success';
const minimumFileBytes = 10 * 1024;
const maximumFileNameLength = 50;
const allowedExtensions = ['jpg', 'jpeg'];
const maxEventAgeMs = 5 * 60 * 1000;


/**
 * Splits the filename using the period and checks the last element matches the allowed extensions.
 * @param {string} fileName
 * @param {string[]} allowedExts
 * @return {boolean}
 */
const isValidFileExtension = (fileName, allowedExts) => {
    return Boolean(allowedExts.find((x) => x === fileName.split('.').pop()));
};

/**
 * Returns a backdated ISO date string.
 * @param {number} maxEventAgeMs
 * @return {string} ISO-8601
 */
const getOldestEventTime = (maxEventAgeMs) => {
    const currentDateMs = new Date().valueOf();
    return new Date(currentDateMs - maxEventAgeMs).toISOString();
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

    // Define variables
    const oldestEventTime = getOldestEventTime(maxEventAgeMs);

    // Example input validation 1
    if (!event.Records || typeof(event.Records) !== 'object' || event.Records.length <= 0) {
        console.error('There are no records', event.Records, typeof(event.Records), event.Records.length);
        callback(Error('Invalid request'));
    }
    event.Records.forEach((record) => {
        // Example input validation 2
        if (record.eventSource !== 'aws:s3') {
            console.error('Invalid event type', record.eventSource);
            callback(Error('Invalid request'));
        }
        // Example input validation 3
        if (record.s3.bucket.name !== BUCKET_NAME) {
            console.error('Invalid event type', record.eventSource);
            callback(Error('Invalid request'));
        }
        // Example input validation 4
        if (record.s3.object.size < minimumFileBytes) {
            console.error('File size is too small', record.s3.object.size);
            callback(Error('Invalid request'));
        }
        // Example input validation 5
        if (record.s3.object.key.length > maximumFileNameLength) {
            console.error('File name is too long', record.s3.object.key);
            callback(Error('Invalid request'));
        }
        // Example input validation 6
        if (!isValidFileExtension(record.s3.object.key, allowedExtensions)) {
            console.error('Invalid file extension', record.s3.object.key);
            callback(Error('Invalid request'));
        }
        // Example input validation 7
        if (record.requestParameters.sourceIPAddress !== WHITELISTED_IP) {
            console.error('Execution only allowed for IP address', WHITELISTED_IP);
            callback(Error('Invalid request'));
        }
        // Example input validation 8
        if (record.eventName !== 'ObjectCreated:Put') {
            console.error('Invalid event name', record.eventName);
            callback(Error('Invalid request'));
        }
        // Example input validation 9
        if (record.eventTime < oldestEventTime) {
            console.error('Event time', record.eventTime, 'is older than', oldestEventTime);
            callback(Error('Invalid request'));
        }
    });
    // Send a response if input validation succeeds
    callback(null, validRequestResponse);
};
