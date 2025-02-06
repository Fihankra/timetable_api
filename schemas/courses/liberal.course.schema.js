const mongoose = require('mongoose');

const LiberalCourseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    courseTitle: { type: String, required: true },
    courseCode: { type: String, required: true },
    studyMode: {type: String, require: true},
    message: { type: String, required: true },
    lecturer:  {type: String, required: true} ,
} );

module.exports = mongoose.model('LiberalCourses', LiberalCourseSchema);