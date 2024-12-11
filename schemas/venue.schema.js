const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    type: { type: String, required: true },
    disabilityFriendly: { type: Boolean, required: true }
});

module.exports = mongoose.model('Venues', VenueSchema);