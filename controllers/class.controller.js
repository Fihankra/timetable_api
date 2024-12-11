const ClassService = require('../services/class.service');

// Create and Save a new Class

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Class data is required' });
            return;
        }
        //check if classes already exists
        const classes = await ClassService.getClassById(data.id);
        console.log(classes);
        if (classes && classes.length > 0) {
            res.json({ status: false, message: 'Class already exists' });
            return;
        }
        //create classes
        const newClass = await ClassService.createClass(data);
        console.log("New ==", newClass);
        res.json({ status: true, message: 'Class created successfully', data: newClass });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }

};

// Retrieve and return all classes from the database.
exports.findAll = async (req, res) => {
    try {
        const classes = await ClassService.getClasses();
        res.json({ status: true, message: "Data found", data: classes });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// update a classes identified by the classesId in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Class data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Class id is required' });
            return
        }
        //update classes
        const updatedClass = await ClassService.updateClass(id, data);
        if (!updatedClass) {
            res.json({ status: false, message: `Cannot update Class with id=${id}. Class not found` });
            return;
        }
        console.log(updatedClass);
        res.json({ status: true, message: 'Class updated successfully', data: updatedClass });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Delete a classes with list of id in the request

exports.delete = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.json({ status: false, message: 'Class ids are required' });
            return;
        }
        console.log(ids);
        //delete classes
        const data = await ClassService.deleteClasses(ids);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Class with ids=${ids}. Class not found` });
            return;
        }
        res.json({ status: true, message: 'Class deleted successfully', data: data });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


