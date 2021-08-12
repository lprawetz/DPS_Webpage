const mongoose = require("mongoose");
const Show = require("../models/shows");

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

const show1 = new Show({
    venue: "SO25",
    location: "Berlin",
    date: "2021-06-15"
});
show1.save()

const show2 = new Show({
    venue: "Elfer",
    location: "Frankfurt",
    date: "2021-07-12"
});
show2.save()

const show3 = new Show({
    venue: "Das Bett",
    location: "Frankfurt",
    date: "2021-07-21"
});
show3.save()

const show4 = new Show({
    venue: "Pipapo",
    location: "Berlin",
    date: "2021-08-13"
});
show4.save().then(() => {
    mongoose.connection.close();
});