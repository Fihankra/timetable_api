const Department = require('../schemas/department.schema');

exports.createDepartment = async (department) => {
    //return the new department after creating it
    const newDepartment = await Department.create(department);
    return newDepartment;
};

exports.getDepartments = async () => {
    return await Department.find();
};

exports.getDepartmentById = async (id) => {
    return await Department.find({ id: id });
};

exports.updateDepartment = async (id, department) => {
    const results= await Department.findOneAndUpdate({ id: id }, department);
    return results;
};

exports.deleteDepartments = async (ids) => {
return await Department.deleteMany({ id: { $in: ids } });
}
