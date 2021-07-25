const mongoose = require("mongoose");
const Gigdate = require("../models/gigdates");

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

const gig1 = new Gigdate({
    venue: "SO25",
    location: "Berlin",
    date: "2021-06-15"
});
gig1.save()

const gig2 = new Gigdate({
    venue: "Elfer",
    location: "Frankfurt",
    date: "2021-07-12"
});
gig2.save()

const gig3 = new Gigdate({
    venue: "Das Bett",
    location: "Frankfurt",
    date: "2021-07-21"
});
gig3.save()

const gig4 = new Gigdate({
    venue: "Pipapo",
    location: "Berlin",
    date: "2021-08-13"
});
gig4.save().then(() => {
    mongoose.connection.close();
});