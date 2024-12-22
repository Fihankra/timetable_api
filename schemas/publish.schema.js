
const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    schoolName: String,
    tableDescription: String,
    tableFooter: String,
    year: String,
    semester: String,
    config: Map
});
const TableItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    vtpId: { type: String, required: true },
    llpCclpId: { type: [String], required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    configId: { type: String, required: true },
    venueId: { type: String, required: true },
    venue: { type: String, required: true },
    venueType: { type: String, required: true },
    venueCapacity: { type: Number, required: true },
    courseId: { type: String, required: true },
    courseCode: { type: String, required: true },
    courseType: { type: String, required: true },
    courseTitle: { type: String, required: true },
    studyMode: { type: String, required: true },
    classIds: { type: [String], required: true },
    classNames: { type: [String], required: true },
    level: { type: String, required: true },
    totalClassSize: { type: Number, required: true },
    programId: { type: String, required: true },
    programName: { type: String, required: true },
    departmentId: { type: String, required: true },
    departmentName: { type: String, required: true },
    day: { type: String, required: true },
    period: { type: String, required: true },
    periodPosition: { type: Number, required: true },
    periodStartTime: { type: String, required: true },
    periodEndTime: { type: String, required: true },
    lecturerId: { type: String, required: true },
    lecturerName: { type: String, required: true },
    lecturerEmail: { type: String, required: true },
    lecturerFreeDay: { type: String } // Optional field
});


const Message = mongoose.model('Messages', MessageSchema);
const TableItem = mongoose.model('Tables', TableItemSchema);
module.exports = { Message, TableItem };