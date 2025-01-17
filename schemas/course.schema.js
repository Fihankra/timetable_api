const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    courseTitle: { type: String, required: true },
    courseCode: { type: String, required: true },
    creditHours: { type: Number, required: true },
    courseProgram: { type: [Map], required: true },
    lecturers: { type: [String], required: true },
    courseType: { type: String, required: true },
    venueType: { type: String, required: true }

} );

module.exports = mongoose.model('Courses', CourseSchema);