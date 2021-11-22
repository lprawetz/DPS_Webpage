const Record = require("../models/records");

module.exports.records = async (req, res) => {
    const records = await Record.find({});
    res.render("music/music", { records });
};

module.exports.showRecord = async (req, res) => {
    const record = await Record.findById(req.params.id);
    res.render("music/record", { record });
};