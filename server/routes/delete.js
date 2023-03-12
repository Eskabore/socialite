const { app } = require('../server.js');
const db = require('../utils/db');

const s3 = require('../s3');

// Delete all the information stored in the database
app.post("/delete-account.json", (req, res) => {
    console.log(
        "req.session.userId will be deletes"
    );

    // Delete picture from AWS bucket
    db.getUser(req.session.userId).then((result) => {
        const userPicture = result.rows[0].picture;
        if (userPicture) {
            s3.delete(userPicture);
        }
    });

    // Delete the user messages
});