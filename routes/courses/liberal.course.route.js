const LiberalCourseController = require('../../controllers/courses/liberalcourse.controller');
const express = require('express');
const router = express.Router();


// Create a new course
router.post('/lib_course', LiberalCourseController.create);
router.get('/lib_course', LiberalCourseController.findAll);
router.put('/lib_course/:id', LiberalCourseController.update);
router.delete('/lib_course', LiberalCourseController.delete);

module.exports = router;
