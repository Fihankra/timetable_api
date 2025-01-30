const CourseController = require('../../controllers/courses/program.course.controller');
const express = require('express');
const router = express.Router();


// Create a new course
router.post('/program_course', CourseController.create);
router.get('/program_course', CourseController.findAll);
router.put('/program_course/:id', CourseController.update);
router.delete('/program_course', CourseController.delete);

module.exports = router;