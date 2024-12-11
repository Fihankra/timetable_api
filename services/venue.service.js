const Venue = require('../schemas/venue.schema');

exports.createVenue = async (venue) => {
    return await Venue.create(venue);
}

exports.getVenues = async () => {
    return await Venue.find();
}

exports.getVenueById = async (id) => {
    return await Venue.find({ id: id });
}

exports.updateVenue = async (id, venue) => {
    return await
        Venue.findOneAndUpdate({id:id}, venue, { new: true });
}

exports.deleteVenues = async (ids) => {
    return await Venue.deleteMany({ id: { $in: ids } });
}

