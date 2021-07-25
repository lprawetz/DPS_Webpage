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
    date: "12.12.2021"
});
gig1.save()

const gig2 = new Gigdate({
    venue: "Elfer",
    location: "Frankfurt",
    date: "06.12.2021"
});
gig2.save()

const gig3 = new Gigdate({
    venue: "Das Bett",
    location: "Frankfurt",
    date: "08.12.2021"
});
gig3.save()

const gig4 = new Gigdate({
    venue: "Pipapo",
    location: "Berlin",
    date: "15.12.2021"
});
gig4.save().then(() => {
    mongoose.connection.close();
});