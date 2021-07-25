const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GigdateSchema = new Schema({
    venue: String,
    location: String,
    date: Date,
    ticketstore: String
});

module.exports = mongoose.model("Gigdate", GigdateSchema);