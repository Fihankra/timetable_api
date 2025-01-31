const LiberalCourseService = require('../../services/courses/liberal.course.service');

exports.create = async (req, res) => {
    try {
            //console.log(req.body);
            const data = req.body;
            if (!data) {
                res.json({ status: false, message: 'Course data is required' });
                return;
            }
            //check if course already exists
            const course = await LiberalCourseService.getLibCourseById(data.id);
            if (course && course.length > 0) {
                res.json({ status: false, message: 'Liberal/African Study Course with the same details already exists' });
                return;
            }
            //create course
            const newCourse = await LiberalCourseService.createLibCourse(data);
            
          if (!newCourse) {
                res.json({ status: false, message: 'Failed to liberal/African Study create Course' });
                return
            }
            const coursesList = await LiberalCourseService.getLibCourse();
            res.json({ status: true, message: 'Liberal/African Study Course created successfully', data: coursesList });
        } catch (err) {
            res.json({ status: false, message: err.message });
        }
}

// Retrieve and return all course from the database.
exports.findAll = async (req, res) => {
    try {
        const coursesList = await LiberalCourseService.getLibCourse();
        res.json({ status: true, message: "Data found", data: coursesList });
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
            res.json({ status: false, message: 'Liberal/African Study Course data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Liberal/African Study Course id is required' });
            return
        }
        //update course
        const updatedCourse = await LiberalCourseService.updateLibCourse(id, data);
        if (!updatedCourse) {
            res.json({ status: false, message: `Cannot update Course with id=${id}. Course not found` });
            return;
        }
        const coursesList = await LiberalCourseService.getLibCourse();
        res.json({ status: true, message: 'Liberal/African Study Course updated successfully', data: coursesList });
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
            res.json({ status: false, message: 'Liberal/African Study Course ids are required' });
            return;
        }
        const data = await LiberalCourseService.deleteLibCourse(ids);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Course with ids=${ids}. Course not found` });
            return;
        }
        const deleteData = await LiberalCourseService.deleteLibCourse();
        if (!deleteData) {
            res.json({ status: false, message: `Cannot delete Course with ids=${ids}. Course not found` });
            return;
        }
        const coursesList =await LiberalCourseService.getLibCourse();
        res.json({ status: true, message: 'Liberal/African Study Course deleted successfully', data: coursesList });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


