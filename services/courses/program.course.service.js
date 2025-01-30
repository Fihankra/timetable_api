const ProgramCourse = require('../../schemas/courses/program.course.schema');


// Create a new course
exports.createCourse = async (course) => {
    return await ProgramCourse.create(course);
};

exports.getCourses = async () => {
    return await ProgramCourse.find();
}

exports.getCourseById = async (id) => {
    return await ProgramCourse.find({ id: id });
}

exports.updateCourse = async (id, course) => {
    return await ProgramCourse.findOneAndUpdate({ id: id }, course, { new: true });
}

exports.deleteCourses = async (ids) => {
    return await ProgramCourse.deleteMany({ id: { $in: ids } });
}

