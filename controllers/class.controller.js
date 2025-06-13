const ClassService = require('../services/class.service');

// Create and Save a new Class

exports.create = async (req, res) => {
    try {
       
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Class data is required' });
            return;
        }
        //check if classes already exists
        const classes = await ClassService.getClassById(data.id);
        if (classes && classes.length > 0) {
            res.json({ status: false, message: 'Class with the same details already exists' });
            return;
        }
        //create classes
        const newClass = await ClassService.createClass(data);
        if(!newClass){
            res.json({ status: false, message: 'Failed to create class' });
            return;
        }
        res.json({ status: true, message: 'Class created successfully', data: newClass });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }

};

// Retrieve and return all classes from the database.
exports.findAll = async (req, res) => {
    try {
        //get query parameters
        const { year, semester } = req.query;
        //check if year and semester are provided
        if (!year || !semester) {
            res.json({ status: false, message: 'Year and semester are required' });
            return;
        }
        const classes = await ClassService.getClasses({ year, semester });
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
        res.json({ status: true, message: 'Class updated successfully', data: data });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Delete a classes with list of id in the request

exports.delete = async (req, res) => {
    try {
        const classes = req.body;
        if (!classes) {
            res.json({ status: false, message: 'Class ids are required' });
            return;
        }
       
        //get all class ids from the request body
        var classIds = [];
        classes.forEach((cls) => {
            classIds.push(cls.id);
        });
        if(!classIds || classIds.length === 0) {
            res.json({ status: false, message: 'Class ids are required' });
            return;
        }
        
        const data = await ClassService.deleteClasses(classIds);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Class with ids=${classIds}. Class not found` });
            return;
        }
        res.json({
          status: true,
          message: "Class deleted successfully",
          data: classes,
        });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


