//loads the dotenv module for local storage of environmental variables while working localy
//also used in utils/sessionconfig
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const expressError = require("./utils/expressError");
const methodOverride = require("method-override");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const session = require("./utils/sessionconfig");
//load page routes from routes folder
const showsRoutes = require("./routes/shows");
const musicRoutes = require("./routes/music");
const mediaRoutes = require("./routes/media");
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/user");

//connect to online database or if not possible to localhost database
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to Database!")
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//sessionConfig found under utils/sessionconfig
app.use(session);
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    if (req.session.user_id) {
        res.locals.isLoggedIn = true;
    } else {
        res.locals.isLoggedIn = false;
    }
    next();
})

//initialize routes from routes folder
app.use("/shows", showsRoutes);
app.use("/music", musicRoutes);
app.use("/media", mediaRoutes);
app.use("/contact", contactRoutes);
app.use("/", userRoutes);


app.get("/", (req, res) => {
    res.render("home");
});

//general error handling
app.all("*", (req, res, next) => {
    next(new expressError("Page not found!", 404))
});

//specific error handling
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!"
    res.status(statusCode).render("error", { err });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running in Port ${port}!`)
});