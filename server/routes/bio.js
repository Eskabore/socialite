const { app } = require('../server.js');
const db = require('../utils/db');

// Route handles new bio draft
app.post('/bio.json', (req, res) => {

    console.log("'POST' /bio.json. req.body is: ", req.body,
        "req.body.bio: ", req.body.bio);

    const newBio = req.body.bio;

    db.updateBio(newBio, req.session.userId)
        .then((result) => {
            console.log("Bio updated successfully", result.rows[0]);

            res.sendStatus(200); // 'ok'

        })
        .catch((error) => {
            console.log("Eroor /bio.json POST: ", error);
        });
});