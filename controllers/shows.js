const Show = require("../models/shows");

module.exports.shows = async (req, res) => {
    const dateAppearance = { weekday: 'short', day: '2-digit', month: 'long', year: '2-digit' };
    const shows = await Show.find({}).sort({ date: "asc" });
    res.render("shows/shows", { shows, dateAppearance });
};

module.exports.renderNewForm = (req, res) => {
    res.render("shows/new");
};

module.exports.createNewShow = async (req, res) => {
    const show = new Show(req.body.show);
    await show.save();
    res.redirect("/shows");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    if (!show) {
        res.send("Show not found!");
        console.log(show);
    }
    res.render("shows/edit", { show })
};

module.exports.updateShow = async (req, res) => {
    const { id } = req.params;
    await Show.findByIdAndUpdate(id, { ...req.body.show });
    res.redirect("/shows");
};

module.exports.deleteShow = async (req, res) => {
    const { id } = req.params;
    await Show.findByIdAndDelete(id);
    res.redirect("/shows");
};