const spicedPg = require('spiced-pg');

const db = spicedPg('postgres:force:12345678@localhost:5432/socialnetwork');


// ------------------  QUERIES for registration PART-1 ------------------ //
exports.createUser = function(first, last, email, hashpassword) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            first,
            last,
            email,
            hashpassword
        ]
    );
};

// ------------------  QUERIES for login PART-2 ------------------ //
exports.getPassword = function(emailFromLoginPage) {
    return db.query(
        `SELECT * FROM users WHERE email = $1`,
        [
            emailFromLoginPage
        ]
    );
};

// ------------------  QUERIES for reset password PART-3 ------------------ //
exports.getUserEmail = function(rpEmail) {
    return db.query(
        `SELECT * FROM users WHERE email = $1`,
        [
            rpEmail
        ]
    );
};


exports.addCode = function(rpEmail, rpCode) {
    return db.query(
        `INSERT INTO reset_codes (email, code)
        VALUES ($1, $2)
        RETURNING *`,
        [
            rpEmail,
            rpCode
        ]
    );
};

exports.getCode = function(rpEmail) {
    return db.query(
        `SELECT * FROM reset_codes WHERE email = $1
        AND CURRENT_TIMESTAMP -
        created_at < INTERVAL '10 minutes'
        ORDER BY
        created_at DESC`,
        [
            rpEmail
        ]
    );
};

exports.updatePassword = function ( rpEmail, rpPassword) {
    return db.query(
        `UPDATE users
        SET password = $2
        WHERE email = $1`,
        [
            rpEmail,
            rpPassword
        ]
    );
};

// ------------------  QUERIES for profile PART-4 ------------------ //

exports.getUserProfile = function (userId) {
    return db.query(
        `SELECT id, first, last, email, picture, bio FROM users WHERE id = $1`,
        [
            userId
        ]
    );
};

// Save picture to s3
exports.savePicture = (picture, userId) => {
    return db.query(
        `UPDATE users SET picture=$1
        WHERE id = $2
        RETURNING picture`,
        [
            picture,
            userId
        ]
    );
};

// ------------------  QUERIES for bio PART-5 ------------------ //
exports.updateBio = (bio, userId) => {
    return db.query(
        `UPDATE users SET bio=$1
        WHERE id = $2
        RETURNING bio`,
        [
            bio,
            userId
        ]
    );
};

// ------------------  QUERIES for search PART-6 ------------------ //
exports.userSearch = (user) => {
    return db.query(
        `SELECT id, first, last, picture
        FROM users
        WHERE CONCAT (first, ' ', last)
        ILIKE $1 ORDER BY last
        ASC LIMIT 3`,
        [
            '%' + user + '%'
        ]
    );
};

// ------------------  QUERIES for other profile PART-7 ------------------ //
exports.getUserById = (user) => {
    return db.query(
        `SELECT id, first, last, picture, bio
        FROM users
        WHERE id = $1`,
        [
            user
        ]
    );
};

// ------------------  QUERIES for friend button PART-8 ------------------ //

// QUERY enquire for friend request between two users (user <-> owner)
exports.getFriendshipStatus = (recipientId, senderId) => {
    return db.query(
        `SELECT * FROM friendships
        WHERE (recipient_id = $1
            AND sender_id = $2)
            OR (sender_id = $1
                AND recipient_id = $2)`,
        [
            recipientId,
            senderId
        ]
    );
};

// QUERY sends friend request
exports.sendFriendRequest = (recipientId, senderId) => {
    return db.query(
        `INSERT INTO friendships (recipient_id, sender_id)
        VALUES ($1, $2)`,
        [
            recipientId,
            senderId
        ]
    );
};

// QUERY accepts friend request
exports.acceptFriendRequest = (recipientId, senderId) => {
    return db.query(
        `UPDATE friendships SET accepted = true
        WHERE recipient_id = $1
        AND sender_id = $2`,
        [
            recipientId,
            senderId
        ]
    );
};

// QUERY cancels friend request (DELETE)
exports.endFriendRequest = (recipientId, senderId) => {
    return db.query(
        `DELETE FROM friendships
        WHERE (recipient_id = $1
            AND sender_id = $2)
            OR (sender_id = $1
                AND recipient_id = $2)`,
        [
            recipientId,
            senderId
        ]
    );
};

// ------------------  QUERIES for friend wannabes PART-9 ------------------ //
// First line: Friend request that I accepted
// Second line: Friend requests that the the profile non-owner has accepted (friends list)
// Third line: wannabes
exports.getFriendsAndWannabes = (userId) => {
    return db.query (
        `SELECT users.id, first, last, accepted, picture FROM users
JOIN friendships
ON (accepted = true AND recipient_id = $1 AND users.id = friendships.sender_id)
OR (accepted = true AND sender_id = $1 AND users.id = friendships.recipient_id)
OR (accepted = false AND recipient_id = $1 AND users.id = friendships.sender_id)`,
        [
            userId
        ]
    );
};

// ------------------  QUERIES for messages PART-10 ------------------ //

// SAVE new message
exports.addNewMessage = (userId, message) => {
    return db.query(
        `INSERT INTO messages (sender_id, message)
        VALUES ($1, $2)`,
        [
            userId,
            message
        ]
    );
};

// Retrieve the 10 most recent messages
exports.getLast10Messages = () => {
    return db.query(
        `SELECT messages.message, messages.sender_id, users.first, users.last, users.picture FROM messages
		JOIN users
        ON (messages.sender_id=users.id) ORDER BY messages.created_at DESC`,
        []
    );
};

// Add a new user
module.exports.getUser = (userId) => {
    return db.query(
        `SELECT first, last, picture FROM users WHERE id = $1`,
        [
            userId
        ]
    );
};
