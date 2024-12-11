const mongoose = require('mongoose');


const DepartmentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false }
});

module.exports = mongoose.model('Departments', DepartmentSchema);
// Compare this snippet from schemas/lecturer.schema.js: