const electivesController = require('../../controllers/courses/electives.course.controller');
const express = require('express');
const router = express.Router();


// Create a new Elective
router.post('/elective-course', electivesController.createElectives);
router.get('/elective-course', electivesController.findAllElectives);
router.put('/elective-course/:id', electivesController.updateElectives);
router.delete('/elective-course', electivesController.deleteElectives);


module.exports = router;