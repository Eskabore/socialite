const express = require("express");
const app = exports.app = express();
const path = require("path");

const db = require('./utils/db');

require("dotenv").config();
const port = process.env.PORT;

//               SERVER.IO                 //
const http = require("http");

const server = http.Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: process.env.ORIGIN_URL,
        methods: ["GET", "POST"]
    },
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith(process.env.ORIGIN_URL))
});




//               COOKIE SESSION                 //
var cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: `${process.env.SESSION_SECRET}`,
    maxAge: 1000 * 60 * 60 * 1, // 1 heure
    sameSite: true // Prevents Cross Site Request Forgery (CSRF) attacks
});

app.use(cookieSessionMiddleware);

// Session object available while/for connecting sockets
io.use(function(socket, next) {
    cookieSessionMiddleware (socket.request, socket.request.res, next);
});


//            EXPRESS PARSER              //
app.use(express.json());
//app.use(express.urlencoded({extended: false}));


//            EXPRESS COMPRESSION              //
// Compress all responses add all routes below it
const compression = require("compression");
app.use(compression());


//               EXPRESS STATIC                 //
app.use(express.static(path.join(__dirname, "..", "client", "public")));


// REQ, RES NEXT

app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error.field, req.method, req.session, res.rows);
    next();
});


//                                 MY ROUTES                                 //
require('./routes/auth');
require('./utils/fileUpload');
require('./routes/picture');
require('./routes/user');
require('./routes/bio');
require('./routes/friendship');


// -----------------------------/MAIN/HOMEPAGE/REGISTRATION-------------------------------//
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});


// -----------------------------/LOGOUT ROUTE -------------------------------//


app.post('/logout.json', (req, res) => {
    // '/logout' --> '/logout.json'
    console.log("req.session.userId in /logout: ", req.session.userId);
    req.session.userId = null;
    // Watch out use req.session || req.session.userId
    res.json( {userId: req.session.userId });
});


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});


// SERVER.IO //


io.on("connection", (socket) => {
    console.log(
        "Connection event in server.js has been triggered. New user connected. socket.id is: ",
        socket.id,
        "User session is: ",
        socket.request.session
    );

    // Stopping unauthenticated users from getting access to our chat messages
    if (!socket.request.session.userId) {
        // 'true' prevents the client from trying to reconnect
        return socket.disconnect(true);
    }


    // - implement getLastChatMessages in db.js (DONE)
    // - needs to be a JOIN with the users table (DONE)
    // - think about the order of the messages (DONE)
    db.getLast10Messages().then((result) => {
        console.log(result.rows);
        socket.emit("chatMessages", result.rows.reverse());
    });

    socket.on("chatMessage", (text) => {
        console.log(
            "chatMessage",
            text,
            "from user",
            socket.request.session.userId
        );

        // 1. store message in db with text & user id
        db.addNewMessage(socket.request.session.userId, text)
            .then(() => {
                // 2. get firstname, lastname, picture of user from db
                return db.getUser(socket.request.session.userId);
            })
            .then((result) => {
                // 3. create new message object with exact same shape
                // as the messages in your chat messages array
                console.log(result.rows[0]);
                const message = {
                    message: text,
                    first: result.rows[0].first,
                    last: result.rows[0].last,
                    picture: result.rows[0].picture,
                };
                return message;
            })
            .then((result) => {
                // 4. emit the chatMessage event to ALL clients
                // io.emit("chatMessage", message);
                io.emit("chatMessage", result);
            });
    });
});

server.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});