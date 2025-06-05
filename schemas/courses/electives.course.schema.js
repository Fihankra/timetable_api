const mongoose = require('mongoose');
  
const ElectivesSchema = new mongoose.Schema({
    id: { type: String, required: true },
    programId: { type: String, required: true },
    level: { type: String, required: true },
    studyMode: { type: String, required: true },
    courses: { type: [Map], required: true },
    departmentId: { type: String, required: true },
});


module.exports = mongoose.model('Electives', ElectivesSchema);