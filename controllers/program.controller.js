const ProgramService = require('../services/program.service');


// Create and Save a new Program

exports.create = async (req, res) => {
    try {
        
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Program data is required' });
            return;
        }
        const program = await ProgramService.getProgramById(data.id);
        if (program && program.length > 0) {
            res.json({ status: false, message: 'Program already exists' });
            return;
        }
        //create Program
        const newProgram = await ProgramService.createProgram(data);
        if (!newProgram) {
            res.json({ status: false, message: 'Failed to  create Program' });
            return;
        }
        const programsList = await ProgramService.getPrograms();
        res.json({ status: true, message: 'Program created successfully', data: programsList });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }

};

// Retrieve and return all Programs from the database.
exports.findAll = async (req, res) => {
    try {
        const programsList = await ProgramService.getPrograms();
        res.json({ status: true, message: "Data found", data: programsList });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// update a Program identified by the ProgramId in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Program data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Program id is required' });
            return
        }
        //update Program
        const updatedProgram = await ProgramService.updateProgram(id, data);
        if (!updatedProgram) {
            res.json({ status: false, message: `Cannot update Program with id=${id}. Program not found` });
            return;
        }
        const programsList = await ProgramService.getPrograms();
        res.json({ status: true, message: 'Program updated', data: programsList });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Delete a Programs with list of id in the request

exports.delete = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.json({ status: false, message: 'Program ids are required' });
            return;
        }
        const data = await ProgramService.deletePrograms(ids);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Program with ids=${ids}. Program not found` });
            return;
        }
        const programsList = await ProgramService.getPrograms();
        res.json({ status: true, message: 'Program deleted successfully', data: programsList });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


