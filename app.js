const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Joi = require("joi");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
// const SC = require("soundcloud");
const Gigdate = require("./models/gigdates");
const Record = require("./models/records");

mongoose.connect("mongodb://localhost:27017/dpsband", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to Database!")
});

const app = express();

mongoose.set('useFindAndModify', false);

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/views/media/"));


app.get("/", (req, res) => {                        //Home
    res.render("home");
});

app.get("/shows", catchAsync(async (req, res, next) => {             //Shows
    const gigdates = await Gigdate.find({}).sort({ date: "asc" });
    res.render("gigdates/shows", { gigdates });
}));

app.get("/shows/new", (req, res) => {               //Neue Show!
    res.render("gigdates/newShow");
});

app.post("/shows", catchAsync(async (req, res, next) => {
    // if (!req.body.gigdates) throw new ExpressError("Invalid Gigdate Data", 400);
    const showSchema = Joi.object({
        show: Joi.object({
            venue: Joi.string().required(),
            location: Joi.string().required(),
            date: Joi.date().required(),
            ticketstore: Joi.string().required()
        }).required()
    })
    const result = showSchema.validate(req.body)
    const show = new Gigdate(req.body.show);
    await show.save();
    res.redirect("/shows");
}));

app.get("/music", catchAsync(async (req, res, next) => {             //Music
    const records = await Record.find({});
    res.render("music/music", { records });
}));

// app.get("/music/pre_new", (req, res) => {           //Neues Record Trackanzahl einstellen
//     res.render("music/tracks_num");
// });

// app.post("/music/new", (req, res) => {
//     const tracks_num = req.body.track_num;
//     res.redirect("/music/new", { tracks_num });
// });

// app.get("/music/new", (req, res) => {               //Neues Record!
//     res.render("music/newRec");
// });

// app.get("/campgrounds/:id", async (req, res) => {                SPÄTER LÖSCHEN!!!!!! Anderes Projekt
//     const campground = await Campground.findById(req.params.id)
//     res.render("campgrounds/show", { campground });
// });

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/media", (req, res) => {
    res.render("media");
});

app.get("/music/:id", catchAsync(async (req, res, next) => {
    const record = await Record.findById(req.params.id);
    res.render("music/record", { record });
}));


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