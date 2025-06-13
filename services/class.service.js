const Class = require('../schemas/class.schema');

exports.createClass = async (classData) => {
    return await Class.create(classData);
}

exports.getClasses = async (classData) => {
    return await Class.find({
        year: classData.year,
        semester: classData.semester
    });
}

exports.getClassById = async (id) => {
    return await Class.find({ id: id });
}

exports.updateClass = async (id, classData) => {
    return await Class.findOneAndUpdate({ id: id }, classData);
}

exports.deleteClasses = async (ids) => {
    return await Class.deleteMany({ id: { $in: ids } });
}


