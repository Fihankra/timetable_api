const mongoose = require('mongoose');


const LecturerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    freeday: { type: String, required: false },
    coursesAndClasses: { type: [Map], required: true },
    configId: { type: String, required: true }
});

module.exports = mongoose.model('Lecturers', LecturerSchema);