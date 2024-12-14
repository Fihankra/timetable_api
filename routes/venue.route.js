const VenueController = require('../controllers/venue.controller');
const express = require('express');
const router = express.Router();

// Create a new Venue
router.post('/venue', VenueController.create);
router.get('/venue', VenueController.findAll);
router.put('/venue/:id', VenueController.update);
router.delete('/venue', VenueController.delete);

module.exports = router;