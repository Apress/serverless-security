'use strict';
const { API_KEY } = process.env;
module.exports.handler = (context, req) => {
    context.log('API_KEY:', API_KEY.replace(/\w/g, '*'));
    context.res = {
        status: 200,
        body: 'Done'
    };
};
