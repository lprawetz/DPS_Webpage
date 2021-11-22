const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediumSchema = new Schema({
    originalname: String,
    cloudname: String,
    url: String
});

module.exports = mongoose.model("Medium", MediumSchema);