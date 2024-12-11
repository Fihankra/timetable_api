const Course = require('../schemas/course.schema');


// Create a new course
exports.createCourse = async (course) => {
    return await Course.create(course);
};

exports.getCourses = async () => {
    return await Course.find();
}

exports.getCourseById = async (id) => {
    return await Course.find({ id: id });
}

exports.updateCourse = async (id, course) => {
    return await Course.findOneAndUpdate({ id: id }, course, { new: true });
}

exports.deleteCourses = async (ids) => {
    return await Course.deleteMany({ id: { $in: ids } });
}

