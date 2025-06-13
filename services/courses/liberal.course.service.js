const LiberalCourses = require('../../schemas/courses/liberal.course.schema');

// Create a new course
exports.createLibCourse = async (libCourse) => {
    return await LiberalCourses.create(libCourse);
};

exports.getLibCourse = async (libData) => {
    return await LiberalCourses.find({
        year: libData.year,
        semester: libData.semester
    });
}

exports.getLibCourseById = async (id) => {
    return await LiberalCourses.find({ id: id });
}

exports.updateLibCourse = async (id, course) => {
    return await LiberalCourses.findOneAndUpdate({ id: id }, course, { new: true });
}

exports.deleteLibCourse = async (ids) => {
    return await LiberalCourses.deleteMany({ id: { $in: ids } });
}

