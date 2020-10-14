'use strict';

exports.http = (request, response) => {
    console.log('request', request);
    console.log()
    response.set('Access-Control-Allow-Origin', 'https://mydomain.com');
    response.set('Access-Control-Allow-Credentials', 'true');
    response.set('Strict-Transport-Security', 'max-age=63072000; includeSubdomains; preload');
    response.set('Content-Security-Policy',
    "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'");
    response.set('X-Content-Type-Options', 'nosniff');
    response.set('X-Frame-Options', 'DENY');
    response.set('X-XSS-Protection', '1; mode=block');
    response.set('Referrer-Policy', 'same-origin');
    response.status(200).send();
};

exports.event = (event, callback) => {
    callback();
};
