const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
// const SC = require("soundcloud");

const shows = require("./routes/shows");
const music = require("./routes/music");
const media = require("./routes/media");
const contact = require("./routes/contact");


mongoose.connect("mongodb://localhost:27017/dpsband", {
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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/shows", shows);
app.use("/music", music);
app.use("/media", media);
app.use("/contact", contact);

app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found!", 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!"
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log("Server is running in Port 3000!")
});