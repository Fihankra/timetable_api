const CourseController = require('../controllers/course.controller');
const express = require('express');
const router = express.Router();


// Create a new course
router.post('/course', CourseController.create);
router.get('/course', CourseController.findAll);
router.put('/course/:id', CourseController.update);
router.delete('/course', CourseController.delete);

module.exports = router;