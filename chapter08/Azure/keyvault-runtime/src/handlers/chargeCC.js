'use strict';

const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const { KEY_VAULT, SECRET_NAME } = process.env;
const credential = new DefaultAzureCredential();
const url = `https://${KEY_VAULT}.vault.azure.net`;
const client = new SecretClient(url, credential);
module.exports.handler = async (context, req) => {
    try {
        const secret = await client.getSecret(SECRET_NAME);
        let apiKey = secret.value;
        context.log('apiKey:', apiKey.replace(/\w/g, '*'));
        context.res = {
            status: 200,
            body: 'Success'
        };
    } catch (e) {
        context.log(e);
        context.res = {
            status: 500,
            body: 'Error'
        };
    }
};
