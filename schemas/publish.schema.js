
const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    schoolName: String,
    tableDescription: String,
    tableFooter: String,
    year: {type: String, required: true },
    semester: { type: String, required: true},
    config: Map,
    studyMode: { type:  String, required: true },
});


const TableItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    vtpId: { type: String, required: true },
    llpCclpId: { type: [String], required: false },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    configId: { type: String, required: true },
    venueId: { type: String, required: true },
    venue: { type: String, required: true },
    venueType: { type: String, required: true },
    venueCapacity: { type: Number, required: true },
    courseId: String,
    courseCode: String,
    courseTitle: String,
    courseType: String,
    studyMode: String,
    classIds: [String],
    classNames: [String],

    classIds:  [String],
    classNames:  [String],

    level: { type: String, required: true },
    totalClassSize: { type: Number, required: true },
    programId: String,
    programName: String,
    departmentId: String,
    departmentName: String,
    day: { type: String, required: true },
    period: { type: String, required: true },
    periodPosition: { type: Number, required: true },
    periodStartTime: { type: String, required: true },
    periodEndTime: { type: String, required: true },
    lecturerId: String,
    lecturerName: String,
    lecturerEmail: String,
    lecturerFreeDay: String,
    creditHours: { type: Number, default: 3 },
    isForced: { type: Boolean, default: false },

    creditHours: { type: Number, default: 3 },
    isForced: { type: Boolean, default: false },

});
  


const Message = mongoose.model('Messages', MessageSchema);
const TableItem = mongoose.model('Tables', TableItemSchema);
module.exports = { Message, TableItem };