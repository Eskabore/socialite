const { app } = require('../server.js');
const { hash, compare } = require('../utils/bc');
const db = require('../utils/db');


// Import random code generator module
const cryptoRandomString = require("crypto-random-string");

// Import ses
const SES  = require('../ses');


//                              REGISTRATION                                 //
app.post('/registration', (req, res) => {

    const { first, last, email, password } = req.body;
    console.log(first,last, email, password);

    // IF fiels are 'true' (required makes empty value false) then hash
    if (first && last && email && password) {
        hash(password, 1) // Lowest difficulty hash, fastest result
            .then((hashedPassword) => {
            //QUERY
                db.createUser(first, last, email, hashedPassword)
                    .then((result) => {
                        // Store user id in cookie session
                        req.session.userId = result.rows[0].id;
                        // Send a JSON response indicating success
                        res.json({ success: true });
                        console.log("Session ID: ", req.session.userId);
                    })
                    // Send a JSON response indicating success
                    .catch((error) => {
                        console.log("Error while creating user (/registration): ", error);
                        res.json({ success: false });
                    });
            })
            .catch((error) => {
                console.log("Error server did not hash password (/registration): ", error);
            });
    }
});

//                                    LOGIN                                   //

// ------------------------------------POST------------------------------------//
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.getPassword(email)
        .then((results) => {
            compare(password, results.rows[0].password)
                .then((booleanResults) => {

                    if (booleanResults) {
                        console.log("Are you logged in ?!: ", booleanResults);
                        req.session.userId = results.rows[0].id;
                        res.json({ success: `${booleanResults}` });
                    } else {
                        // IF false, reloads with error message
                        console.log("Are you logged in ?!: ", booleanResults);
                        res.json({ success: `${booleanResults}` });
                    }
                })
                .catch((error) => console.log("Error in password compare() : ", error));
        })
        .catch((error) => {
            console.log("A user with the given email does not exist!", error);
            res.json({ success: false });
        });
});


app.post('/password/reset/start.json', (req, res) => {
    const email = req.body.email;
    console.log(req.body);

    db.getUserEmail(email)
        .then((result) => {
            console.log(result.rows);

            if (result.rows.length !== 0) {

                //Generate random password
                const secretCode = cryptoRandomString({
                    length: 6
                });

                console.log(email, secretCode);
                db.addCode(email, secretCode)
                    .then(() => {
                        console.log("Code stored in Table: ", result.rows);
                        SES.sendEmail(
                            email,
                            `Hey ${result.rows[0].first} ${result.rows[0].last}, here is your code! ${secretCode}`,
                            "Your new Code!"
                        )
                            .then(() => {
                                console.log("Mail sent!");
                                res.json({
                                    success: true,
                                });
                            })
                            .catch((err) => {
                                console.log("Error sending the e-mail:", err);
                                res.json({
                                    success: false,
                                });
                            });
                    })
                    .catch((err) => console.log("Error storing Code: ", err));
            }
        })
        .catch((err) => {
            console.log("Error getting provided e-mail: ", err);
            res.json({
                success: false,
            });
        });
});

// Verify code alias step 2
app.post('/password/reset/verify.json', (req, res) => {
    // 1 Find user 'email'
    // 2 compare code
    // 3 update password
    const { email, code, password } = req.body;

    db.getUserEmail(email)
        .then((result) => {
            if (result.rows.length !== 0) {

                db.getCode(email)
                    .then((result) => {
                        const rpCode = result.rows[0].code;

                        if (rpCode === code) {

                            // IF user input code matches DB code -> 3
                            hash(password, 1)
                                .then((hashedPassword) => {

                                    db.updatePassword(email, hashedPassword);
                                })
                                .then((result) => {
                                    console.log("TO DELETE in production-> New password has been saved in database: ", result);
                                    res.sendStatus(200);
                                })
                                .catch((error) => {
                                    console.log("Something went wrong! ", error);
                                    res.sendStatus(400);
                                });
                        } else {
                            console.log("The code you've entered does not match what we've sent. Please try again.");
                            res.sendStatus(400);
                        }
                    });
            } else {
                console.log("The email you've entered, is not registerd! Please try again.");
                res.sendStatus(400);
            }
        });
});