const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
    id: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    days: { type: Array, required: true },
    periods: { type: Array, required: true },
    libDay: { type: String, required: false },
    libLevel: { type: String, required: false },
    preInternshipDay: { type: String, required: false },
    postInternshipDay: { type: String, required: false },
    preInternshipLevel: { type: String, required: false },
    postInternshipLevel: { type: String, required: false },
    preInternshipPeriod: { type: Object, required: false },
    postInternshipPeriod: { type: Object, required: false },
    breakTime: { type: Object, required: false },
    regLibPeriod: { type: Object, required: false },
    isCurrent: { type: Boolean, required: true }
});

module.exports = mongoose.model('Config', ConfigSchema);
