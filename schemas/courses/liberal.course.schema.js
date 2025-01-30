const mongoose = require('mongoose');

const LiberalCourseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    courseTitle: { type: String, required: true },
    courseCode: { type: String, required: true },
    program: { type: [Map], required: true },
    lecturers:  [Map] ,
} );

module.exports = mongoose.model('LiberalCourses', LiberalCourseSchema);