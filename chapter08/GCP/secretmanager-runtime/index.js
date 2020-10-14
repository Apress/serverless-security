'use strict';
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();
const { SECRET_NAME } = process.env;
exports.chargeCC = async (request, response) => {
    try {
        const [version] = await client.accessSecretVersion({
            name: SECRET_NAME
        });
        const apiKey = version.payload.data.toString('utf8');
        console.log('apiKey:', apiKey.replace(/\w/g, '*'));
        response.status(200).send('Success');
    } catch (e) {
        console.error(e);
        response.status(500).send('Error');
    }
};
