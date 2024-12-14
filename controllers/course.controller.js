const CourseService = require('../services/course.service');

// Create and Save a new Course

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Course data is required' });
            return;
        }
        //check if course already exists
        const course = await CourseService.getCourseById(data.id);
        console.log(course);
        if (course && course.length > 0) {
            res.json({ status: false, message: 'Course already exists' });
            return;
        }
        //create course
        const newCourse = await CourseService.createCourse(data);
        console.log("New ==", newCourse);
        res.json({ status: true, message: 'Course created successfully', data: newCourse });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }

};

// Retrieve and return all course from the database.
exports.findAll = async (req, res) => {
    try {
        const course = await CourseService.getCourses();
        res.json({ status: true, message: "Data found", data: course });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// update a course identified by the courseId in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Course data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Course id is required' });
            return
        }
        //update course
        const updatedCourse = await CourseService.updateCourse(id, data);
        if (!updatedCourse) {
            res.json({ status: false, message: `Cannot update Course with id=${id}. Course not found` });
            return;
        }
        console.log(updatedCourse);
        res.json({ status: true, message: 'Course updated successfully', data: updatedCourse });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Delete a course with list of id in the request

exports.delete = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.json({ status: false, message: 'Course ids are required' });
            return;
        }
        console.log(ids);
        //delete course
        const data = await CourseService.deleteCourses(ids);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Course with ids=${ids}. Course not found` });
            return;
        }
        res.json({ status: true, message: 'Course deleted successfully', data: data });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


