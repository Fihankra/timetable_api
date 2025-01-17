const electivesController = require('../controllers/electives.controller');
const express = require('express');
const router = express.Router();


// Create a new Elective
router.post('/electives', electivesController.createElectives);
router.get('/electives', electivesController.findAllElectives);
router.put('/electives/:id', electivesController.updateElectives);
router.delete('/electives', electivesController.deleteElectives);


module.exports = router;