const mongoose = require("mongoose");
const Record = require("../models/records");

mongoose.connect("mongodb://localhost:27017/dpsband", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to Database!")
});

const rec1 = new Record({
    name: "Era",
    songs: ["Die Alone", "Behind The Walls", "480 BC"],
    published: 2019,
    cover: "ERA_web.jpg"
});
rec1.save().then(() => {
    mongoose.connection.close();
});

