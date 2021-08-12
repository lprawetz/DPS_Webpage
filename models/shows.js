const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShowSchema = new Schema({
    venue: String,
    location: String,
    date: Date,
    ticketstore: String
});

module.exports = mongoose.model("Show", ShowSchema);