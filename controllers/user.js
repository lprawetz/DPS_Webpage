const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.userSetup = async (req, res) => {
    const hash = await bcrypt.hash(process.env.PASSWORD, 12);
    const user = new User({
        username: process.env.USERNAME,
        password: hash
    });
    await user.save();
    res.redirect("/login");
};

module.exports.renderLogin = (req, res) => {
    res.render("login");
};

module.exports.userLogin = async (req, res) => {
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
};

module.exports.userLogout = (req, res) => {
    req.session.user_id = null;
    req.flash("success", "Logged out!");
    res.redirect("/shows");
};