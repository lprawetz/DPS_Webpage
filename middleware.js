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

