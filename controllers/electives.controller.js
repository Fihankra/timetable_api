const electivesService = require('../services/electives.service');
const courseService = require('../services/course.service');


exports.createElectives = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Elective data is required' });
            return;
        }
        //check if electives already exists
        const electives = await electivesService.getElectiveById(data.id);
        if (electives && electives.length > 0) {
            res.json({ status: false, message: 'Elective with the same details already exists' });
            return;
        }
        const courses = data.courses;
        //loop through the courses to check if they exist else create them
        for (let i = 0; i < courses.length; i++) {
            const course = courses[i];
            const courseExist = await courseService.getCourseById(course.id);
            if (!courseExist || courseExist.length === 0) {
                await courseService.createCourse(course);
            }
        }
        //create electives
        const newElective = await electivesService.createElective(data);
        if (!newElective) {
            res.json({ status: false, message: 'Failed to create elective' });
            return;
        }
        const electivesList = await electivesService.getElectives();
        const coursesList = await courseService.getCourses();
        res.json({ status: true, message: 'Elective created successfully', data: electivesList, courses: coursesList });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


exports.findAllElectives = async (req, res) => {
    try {
        const electives = await electivesService.getElectives();
        res.json({ status: true, message: "Data found", data: electives });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

exports.updateElectives = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Elective data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Elective id is required' });
            return
        }
        //get old elective data
        const elective = await electivesService.getElectiveById(id);
        if (!elective || elective.length === 0) {
            res.json({ status: false, message: `Cannot update Elective with id=${id}. Elective not found` });
            return;
        }
        
        //get all courses from old elective and delete them
        const oldCourses = elective[0].courses;
        for (let i = 0; i < oldCourses.length; i++) {
            const course = oldCourses[i];
            await courseService.deleteCourses([course.id]);
        }
        //loop through the courses to check if they exist else create them
        const courses = data.courses;
        for (let i = 0; i < courses.length; i++) {
            const course = courses[i];
            const courseExist = await courseService.getCourseById(course.id);
            if (!courseExist || courseExist.length === 0) {
                await courseService.createCourse(course);
            }
        }
        //update electives
        const updatedElective = await electivesService.updateElective(id, data);
        if (!updatedElective) {
            res.json({ status: false, message: `Cannot update Elective with id=${id}. Elective not found` });
            return;
        }
        const electivesList = await electivesService.getElectives();
        const coursesList = await courseService.getCourses();
        res.json({ status: true, message: 'Elective updated successfully', data: electivesList, courses: coursesList });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.deleteElectives = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.json({ status: false, message: 'Elective ids are required' });
            return;
        }
        //get all electives to be deleted and get all courses in them
        //loop through ids to get all courses in the electives
        let courses = [];
        for (let i = 0; i < ids.length; i++) {
            const elective = await electivesService.getElectiveById(ids[i]);
            if (elective && elective.length > 0) {
                courses = courses.concat(elective[0].courses);
            }
        }
        //delete courses
        const deletedCourses = await courseService.deleteCourses(courses.map(course => course.id));
        if (!deletedCourses) {
            res.json({ status: false, message: `Cannot delete Courses with ids=${courses.map(course => course.id)}. Course not found` });
            return;
        }
        //delete electives
        const deletedElectives = await electivesService.deleteElectives(ids);
        if (!deletedElectives) {
            res.json({ status: false, message: `Cannot delete Elective with ids=${ids}. Elective not found` });
            return;
        }
        const electivesList = await electivesService.getElectives();
        const coursesList = await courseService.getCourses();
        res.json({ status: true, message: 'Elective deleted successfully', data: electivesList, courses: coursesList });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}
