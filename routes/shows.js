const express = require("express");
const router = express.Router();
const { validateShow } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const Show = require("../models/shows");

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

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    if (!show) {
        res.send("Show not found!");
        console.log(show);
    }
    res.render("shows/edit", { show })
}));

router.put("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Show.findByIdAndUpdate(id, { ...req.body.show });
    res.redirect("/shows");
}));

router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Show.findByIdAndDelete(id);
    res.redirect("/shows");
}));

module.exports = router;