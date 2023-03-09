const { app } = require('../server.js');
const db = require('../utils/db');

// PART 1 - STEP 4
app.get('/user/id.json', (req, res) => {
    console.log("req.session /user/id.json: ", req.session);
    res.json({
        userId: req.session.userId
    });
});

// PART 4: Retrieve all data from user account
app.get('/user.json', (req, res) => {
    console.log("'/user.json' req.session: ", req.session);
    console.log("'/user.json' req.session.userId: ", req.session.userId);

    db.getUserProfile(req.session.userId)
        .then((result) => {
            console.log("result.rows[0] in /user.json: ", result.rows[0]);
            res.json(result.rows[0]);
        })
        .catch((error) => {
            console.log("Error getting user's data from server: ", error);
            res.json({ success: false});
        });
});

// PART 6: Retrieve specific user's data for <FindPeople />
app.get('/users.json', (req, res) => {
    console.log("req.query in /users.json: ", req.query.q);

    db.userSearch(req.query.q)
        .then((result) => {
            console.log("User's data from DB: ", result.rows);

            res.json(result.rows);
        })
        .catch((error) => {
            console.log("/users.json errror: ", error);
        });
});

// PART 7: Retrieve specific user's data for <OtherProfile  />
app.get('/user/:id.json', (req, res) => {
    console.log("/user/:id.json GET request has been trigerred");

    db.getUserById(req.params.id)
        .then((user) => {
            console.log("Object retrieved from DB for <OtherProfile />:", user.rows[0]);

            if (user) {
                console.log("user/:id.json triggered, user.rows[0]: ", user.rows);
                res.json(user.rows[0]);
            } else {
                res.sendStatus(404);
            }
        });
});