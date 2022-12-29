const mongoose = require('mongoose');

const mongoEndpoint = 'mongodb+srv://jong:Jojo-970920@cluster0.cbqlgjn.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(mongoEndpoint)
    .then(() => console.log('Connection to Database Established'))
    .catch((err) => console.log('Error in connecting to database', err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});