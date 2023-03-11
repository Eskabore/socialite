const aws = require("aws-sdk");
const fs = require("fs");
const { unlink } = require("fs/promises");

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports.uploader = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;
    console.log("req.file obj: ", req.file);

    s3.putObject({
        Bucket: "eskabucket",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            console.log("Upload successfull");
            unlink(path);
            next();
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};

// Delete object/picture from AWS account
module.exports.delete = (picture) => {
    const params = {
        Bucket: "eskabucket",
        Key: picture,
    };
    s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        // an error occured while deleting the picture)
        else console.log(data); // success
    })
        .promise()
        .then(() => {
            console.log("The picture has been deleted successfully");
        });
};
