const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Show = require("../models/shows");
const { showSchema } = require("../schemas");


const validateShow = (req, res, next) => {
    const { error } = showSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(elem => elem.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get("/", catchAsync(async (req, res) => {             //Shows
    const shows = await Show.find({}).sort({ date: "asc" });
    res.render("shows/shows", { shows });
}));

router.get("/new", (req, res) => {               //Neue Show!
    res.render("shows/new");
});

router.post("/", validateShow, catchAsync(async (req, res) => {
    const show = new Show(req.body.show);
    await show.save();
    res.redirect("/shows");
}));


module.exports = router;