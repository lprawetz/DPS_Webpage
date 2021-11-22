//loads the dotenv module for local storage of environmental variables while working localy
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};

const session = require("express-session");
const MongoStore = require("connect-mongo");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/dpsband";

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret: process.env.SECRET,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
});

const sessionConfig = {
    store,
    name: "session",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

module.exports = session(sessionConfig);