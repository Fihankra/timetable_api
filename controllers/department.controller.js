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
            res.json({ status: false, message: 'Department already exists' });
            return;
        }
        //create department
        const newDepartment = await DepartmentService.createDepartment(data);
        console.log("New ==",newDepartment);
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
        console.log(updatedDepartment);
        res.json({ status: true, message: 'Department updated successfully', data: updatedDepartment });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Delete a departments with list of id in the request

exports.delete = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.json({ status: false, message: 'Department ids are required' });
            return;
        }
        console.log(ids);
        //delete departments
        const data = await DepartmentService.deleteDepartments(ids);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Department with ids=${ids}. Department not found` });
            return;
        }
        res.json({ status: true, message: 'Department deleted successfully', data: data });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


