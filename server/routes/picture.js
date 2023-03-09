const { app } = require('../server.js');
const db = require('../utils/db');

const { uploader } = require('../utils/fileUpload');
const s3 = require("../s3");




// POST/UPLOAD file/image
app.post("/picture.json", uploader.single("file"), s3.uploader, (req, res) => {
    console.log("req.body /picture.json", req.body);
    console.log("req.file /picture.json", req.file);
    let picture = 'https://eskabucket.s3.amazonaws.com/' + req.file.filename;

    // The order of parameters is important
    db.savePicture(picture, req.session.userId)
        .then(result => {
            console.log("This is result.rows in /picture.json: ", result.rows);
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.log('POST /upload error: ', err);
            res.render('error', { error: true });
        });
});