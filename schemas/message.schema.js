
const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    schoolName: String,
    tableDescription: String,
    tableFooter: String,
    year: String,
    semester: String,
    config: Map
});

const Message = mongoose.model('Messages', MessageSchema);
module.exports = Message;