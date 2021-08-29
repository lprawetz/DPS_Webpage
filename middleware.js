const { showSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");

module.exports.validateShow = (req, res, next) => {
    const { error } = showSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(elem => elem.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.flash("error", "Please log in!");
        res.redirect("/login");
    }
    next();
};