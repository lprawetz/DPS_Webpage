const { showSchema } = require("./schemas");
const ExpressError = require("./ExpressError");

module.exports.validateShow = (req, res, next) => {
    const { error } = showSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(elem => elem.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};

//checks if there is a user_id in the current session cookie (i.e if there is a user logged in)
//if there is a user_id extra buttons for editing are shown on pages: shows/show.ejs, music/music.ejs and media/media.ejs
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.flash("error", "Please log in!");
        res.redirect("/login");
    }
    next();
};