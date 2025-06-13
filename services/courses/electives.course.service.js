const ElectivesSchema = require('../../schemas/courses/electives.course.schema');


exports.createElective = async (elective) => {
   return await ElectivesSchema.create(elective);
};

exports.getElectives = async (electiveData) => {
    return await ElectivesSchema.find({
        year: electiveData.year,
        semester: electiveData.semester
    });
};

exports.getElectiveById = async (id ) => {
    return await ElectivesSchema.find({ id: id });
}

exports.updateElective = async (id, elective) => {
    return await ElectivesSchema.findOneAndUpdate({ id: id }, elective);
}

exports.deleteElectives = async (ids) => {
    return await ElectivesSchema.deleteMany({ id: { $in: ids } });
}