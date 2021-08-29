const express = require("express");
const router = express.Router();
const { validateShow, isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const Show = require("../models/shows");

router.get("/", catchAsync(async (req, res) => {
    const shows = await Show.find({}).sort({ date: "asc" });
    res.render("shows/shows", { shows });
}));

router.get("/new", isLoggedIn, (req, res) => {
    res.render("shows/new");
});

router.post("/", isLoggedIn, validateShow, catchAsync(async (req, res) => {
    const show = new Show(req.body.show);
    await show.save();
    res.redirect("/shows");
}));

router.get("/:id/edit", isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    if (!show) {
        res.send("Show not found!");
        console.log(show);
    }
    res.render("shows/edit", { show })
}));

router.put("/:id", isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Show.findByIdAndUpdate(id, { ...req.body.show });
    res.redirect("/shows");
}));

router.delete("/:id", isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Show.findByIdAndDelete(id);
    res.redirect("/shows");
}));

module.exports = router;