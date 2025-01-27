const mongoose = require('mongoose');

const uri =
    "mongodb+srv://emmanuelfrimpong07:XjePnIUhA2t9rOM1@timetable.zo6su.mongodb.net/AAMUSTED_TIMETABLE";

// const uri = "mongodb://localhost:27017/timetable";
// const uri = "mongodb://localhost:27017/AAMUSTED_TIMETABLE";


// Connect to MongoDB
mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

// Create a connection to the database
const db = mongoose.connection;

// Check if the connection is successful



module.exports = db;
