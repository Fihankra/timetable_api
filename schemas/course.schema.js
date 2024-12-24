const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    courseTitle: { type: String, required: true },
    courseCode: { type: String, required: true },
    creditHours: { type: Number, required: true },
    departmentId: { type: String, required: true },
    studyMode: { type: [String], required: true },
    programId: { type: String, required: true },
    level: { type: String, required: true },
    configId: { type: String, required: true },
    lecturers: { type: [String], required: true },
    courseType: { type: String, required: true },
    venueType: { type: String, required: true }

} );

module.exports = mongoose.model('Courses', CourseSchema);