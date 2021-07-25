const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    name: String,
    songs: [String],
    published: Number,
    cover: String
});

module.exports = mongoose.model("Record", RecordSchema);