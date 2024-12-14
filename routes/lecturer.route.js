const LecturerController = require('../controllers/lecturer.controller');
const express = require('express');
const router = express.Router();

// Create a new lecturer
router.post('/lecturer', LecturerController.create);
router.get('/lecturers', LecturerController.findAll);
router.put('/lecturer/:id', LecturerController.update);
router.delete('/lecturer', LecturerController.delete);

module.exports = router;