'use strict';
module.exports.handler = (event, content, callback) => {
    const headers = {
        'Strict-Transport-Security':
            'max-age=63072000; includeSubdomains; preload',
        'Content-Security-Policy':
            "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'",
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'same-origin'
    };
    callback(null, {
        statusCode: 200,
        headers
    });
};
