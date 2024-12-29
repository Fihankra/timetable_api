const VenueService = require('../services/venue.service');
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Venue data is required' });
            return;
        }
        //check if venue already exists
        const venue = await VenueService.getVenueById(data.id);
        console.log(venue);
        if (venue && venue.length > 0) {
            res.json({ status: false, message: 'Venue with the same details already exists' });
            return;
        }
        //create venue
        const newVenue = await VenueService.createVenue(data);
        if (!newVenue) {
            res.json({ status: false, message: 'Failed to  create Venue' });
            return;
        }
        const venuesList = await VenueService.getVenues();
        res.json({ status: true, message: 'Venue created successfully', data: venuesList });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }

};

// Retrieve and return all venue from the database.
exports.findAll = async (req, res) => {
    try {
        const venuesList = await VenueService.getVenues();
        res.json({ status: true, message: "Data found", data: venuesList });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// update a venue identified by the venueId in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Venue data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Venue id is required' });
            return
        }
        //update venue
        const updatedVenue = await VenueService.updateVenue(id, data);
        if (!updatedVenue) {
            res.json({ status: false, message: `Cannot update Venue with id=${id}. Venue not found` });
            return;
        }
        const venuesList = await VenueService.getVenues();
        res.json({ status: true, message: 'Venue updated successfully', data: venuesList });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Delete a venue with list of id in the request

exports.delete = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.json({ status: false, message: 'Venue ids are required' });
            return;
        }
        const data = await VenueService.deleteVenues(ids);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Venue with ids=${ids}. Venue not found` });
            return;
        }
        const venuesList = await VenueService.getVenues();
        res.json({ status: true, message: 'Venue deleted successfully', data: venuesList });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


