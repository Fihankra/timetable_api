const mongoose = require('mongoose');

 
const ProgramSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    departmentId: { type: String, required: true },
    studyMode: { type: [String], required: true }
});

module.exports = mongoose.model('Programs', ProgramSchema);