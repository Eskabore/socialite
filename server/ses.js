require("dotenv").config();
const AWS = require("aws-sdk");

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

const SES = new AWS.SES({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    region: process.env.AWS_REGION,
});

exports.sendEmail = function (to, message, subject) {
    return SES
        .sendEmail({
            Source: "Jean-Luc Turquin <desk@diffrenzz.com>",

            Destination: {
                ToAddresses: [to],
            },

            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },

                Subject: {
                    Data: subject,
                },
            },
        })

        .promise()

        .then(() => console.log("Your email has been sent!"))

        .catch((error) =>
            console.log(
                "An error has occured while sending your email. Please, try again.",
                error
            )
        );
};
