const mongoose = require('mongoose');

const LiberalCourseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    courseTitle: { type: String, required: true },
    courseCode: { type: String, required: true },
    studyMode: {type: String, require: true},
    program: { type: [String], required: true },
    lecturers:  [String] ,
} );

module.exports = mongoose.model('LiberalCourses', LiberalCourseSchema);