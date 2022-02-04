const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.SES_accessKeyId,
    secretAccessKey: process.env.SES_secretAccessKey,
    region: process.env.SES_region
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

function sendMail(eMailTo, eMailFrom, message) {
    const params = {
        Destination: {
            CcAddresses: [eMailTo],
            ToAddresses: [eMailTo]
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: message
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `${eMailFrom} contacted you!`
            }
        },
        Source: eMailTo
    };
    return ses.sendEmail(params).promise();
}

module.exports = sendMail;