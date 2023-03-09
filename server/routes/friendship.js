const { app } = require('../server.js');
const db = require('../utils/db');

// ----------------------------- PART 8 -------------------------------//

// ----------------------------- GET Routes -------------------------------//

// Retrieve friendship request status between profile user and owner from button
app.get("/friendshipstatus/:id.json", (req, res) => {
    console.log("'/friendshipstatus/:id.json' has been triggered");
    console.log("req.params: ", req.params, " and req.session: ", req.session);

    db.getFriendshipStatus(req.params.id, req.session.userId) // recipient <-> sender

        .then((result) => {
            console.log("FriendshipStatus info from DB: ", result.rows[0]);

            // IF table 'friendships' 's empty (No rows found)
            // -> No frienshhip between users
            // Send friend request
            if (result.rows.length === 0) {
                console.log("Not friends yet!");
                res.json("send friend request");
            }
            // ELSE IF users are already friends
            // Unfriend
            else if (result.rows[0].accepted){
                console.log("We're already friends!");
                res.json("unfriend");
            }
            // ELSE IF users 'friendships'table !empty
            // & no frienship (result.rows[0].accepted === false)
            // -> Verify if senderId === userId (login user sent request?)
            // => Button text is 'cancel friend request'
            else if (result.rows[0].sender_id === req.session.userId) {
                console.log("You have aalredy sent a request");
                res.json("cancel friend request");
            }
            // IF NOT
            // => Acccept Friend Request
            else {
                result.rows[0].accepted === true;
                console.log("Welcome a new friend");
                res.json("accept friend request");
            }
        });
});

// ----------------------------- POST Routes -------------------------------//

// Send friend request
app.post("/send-friend-request/:id.json", (req, res) => {
    console.log("POST /send-friend-request req.body: ", req.body);

    db.sendFriendRequest(req.params.id, req.session.userId)
        .then(() => {
            console.log("Friend request sent successfully");
            res.json("cancel friend request");
        });
});

// Accept friend request
app.post("/accept-friend-request/:id.json", (req, res) => {
    console.log("POST /accept-friend-request req.body: ", req.body);

    db.acceptFriendRequest(req.session.userId, req.params.id)
        .then(() => {
            console.log("Frienship accepted");
            res.json("unfriend");
        });
});

// Cancel and 'and' or 'or' delete request
app.post("/end-friendship/:id.json", (req, res) => {
    console.log("POST /end-friendship req.body: ", req.body);

    db.endFriendRequest(req.params.id, req.session.userId)
        .then(() => {
            console.log("Cancelled friend request OR unfriended user");
            res.json("send friend request");
        });
});

// ----------------------------- PART 9 -------------------------------//

// Retrieve both friends' list and wannabes'
app.get("/friends-wannabes.json", (req, res) => {
    console.log("GET /friends-wannabes has been triggered");

    db.getFriendsAndWannabes(req.session.userId)
        .then((result) => {
            console.log("Received list of friends and wannabes result.rows: ", result.rows);
            res.json(result.rows);
        });
});