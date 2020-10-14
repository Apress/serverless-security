'use strict';

const headers = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubdomains; preload',
    'Content-Security-Policy':
        "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'same-origin'
};

exports.http = (request, response) => {
    console.log('request', request);
    console.log()
    response.status(200).send();
};

exports.event = (event, callback) => {
    callback();
};
