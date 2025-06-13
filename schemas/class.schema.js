const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    id: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    name: { type: String, required: true },
    departmentId: { type: String, required: true },
    programId: { type: String, required: true },
    level: { type: String, required: true },
    classSize: { type: Number, required: true },
    hasDisability: { type: Boolean, required: true },
    studyMode: { type: String, required: true },

});

module.exports = mongoose.model('Classes', ClassSchema);
