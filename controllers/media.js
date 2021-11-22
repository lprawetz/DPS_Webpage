const Medium = require("../models/media");

module.exports.media = async (req, res) => {
    const media = await Medium.find({});
    res.render("media/media", { media });
};

module.exports.renderNewForm = (req, res) => {
    res.render("media/new");
};

module.exports.createNewMedia = async (req, res) => {
    const media = new Medium({ originalname: req.file.originalname, cloudname: req.file.filename, url: req.file.path });
    await media.save();
    res.redirect("/media");
};