const classSchema = require('../schemas/class.schema');
const programSchema = require('../schemas/program.schema');
const courseSchema = require('../schemas/courses/program.course.schema');
const electivesSchema = require('../schemas/courses/electives.course.schema');
const DepartmentService = require('../services/department.service');

// Create and Save a new Department

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Department data is required' });
            return;
        }
        //check if department already exists
        const department = await DepartmentService.getDepartmentById(data.id);
        console.log(department);
        if (department&& department.length>0) {
            res.json({ status: false, message: 'Department with the same details already exists' });
            return;
        }
        //create department
        const newDepartment = await DepartmentService.createDepartment(data);
        if(!newDepartment){
            res.json({ status: false, message: 'Error creating department' });
            return;
        }
        // const departments = await DepartmentService.getDepartments();
        res.json({ status: true, message: 'Department created successfully', data: newDepartment });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }

};

// Retrieve and return all departments from the database.
exports.findAll = async (req, res) => {
    try {
        const departments = await DepartmentService.getDepartments();
        res.json({ status: true, message: "Data found", data: departments });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// update a department identified by the departmentId in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Department data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Department id is required' });
            return
        }
        //update department
        const updatedDepartment = await DepartmentService.updateDepartment(id, data);
        if (!updatedDepartment) {
            res.json({ status: false, message: `Cannot update Department with id=${id}. Department not found` });
            return;
        }
       // const departments = await DepartmentService.getDepartments();
        res.json({ status: true, message: 'Department updated successfully', data: data });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Delete a departments with list of id in the request

exports.delete = async (req, res) => {
    try {
        const department = req.body;
        if (!department) {
            res.json({ status: false, message: 'Department is required' });
            return;
        }
        const data = await DepartmentService.deleteDepartment(department);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Department with id=${deleteDepartment.id}. Department not found` });
            return;
        }
        //delete all programs associated with the departments
       await programSchema.deleteMany({ departmentId:  department.id  }).then((result) => {
        if (result.deletedCount > 0) {
          console.log("Programs deleted successfully");
        } else {
          console.log("No programs found for the given department");
        }
        }).catch((err) => {
            console.error('Error deleting programs:', err);
        });
        //delete all classes associated with the departments
        await classSchema.deleteMany({ departmentId: department.id }).then((result) => {
            if (result.deletedCount > 0) {
                console.log("Classes deleted successfully");
            } else {
                console.log("No classes found for the given department");
            }
        }).catch((err) => {
            console.error('Error deleting classes:', err);
        });
        //delete all courses associated with the departments
        await courseSchema.deleteMany({ departmentId: department.id }).then((result) => {
            if (result.deletedCount > 0) {
                console.log("Courses deleted successfully");
            } else {
                console.log("No courses found for the given department");
            }
        }).catch((err) => {
            console.error('Error deleting courses:', err);
        });
        //delete all elective courses associated with the departments
        await electivesSchema.deleteMany({ departmentId: department.id }).then((result) => {
            if (result.deletedCount > 0) {
                console.log("Elective courses deleted successfully");
            } else {
                console.log("No elective courses found for the given department");
            }
        }).catch((err) => {
            console.error('Error deleting elective courses:', err);
        });
        //const departments = await DepartmentService.getDepartments();
        res.json({ status: true, message: 'Department deleted successfully', data: department });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


