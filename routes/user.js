const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get("/loginSetup", catchAsync(async (req, res) => {
    const hash = await bcrypt.hash(process.env.PASSWORD, 12);
    const user = new User({
        username: process.env.USERNAME,
        password: hash
    });
    await user.save();
    res.redirect("/login");
}));

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        req.session.user_id = user._id;
        res.redirect("/shows");
    } else {
        req.flash("error", "Wrong Username or Password!");
        res.redirect("/login");
    }
}));

router.get("/logout", (req, res) => {
    req.session.user_id = null;
    req.flash("success", "Logged out!");
    res.redirect("/shows");
});

module.exports = router;
