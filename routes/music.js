const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Record = require("../models/records");

router.get("/", catchAsync(async (req, res) => {            //Music
    const records = await Record.find({});
    res.render("music/music", { records });
}));

router.get("/:id", catchAsync(async (req, res) => {
    const record = await Record.findById(req.params.id);
    res.render("music/record", { record });
}));

module.exports = router;