const LecturerService = require('../services/lecturer.service');

// Create and Save a new Lecturer

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Lecturer data is required' });
            return;
        }
        //check if lecturer already exists
        const lecturer = await LecturerService.getLecturerById(data.id);
        console.log(lecturer);
        if (lecturer && lecturer.length > 0) {
            res.json({ status: false, message: 'Lecturer already exists' });
            return;
        }
        //create lecturer
        const newLecturer = await LecturerService.createLecturer(data);
        console.log("New ==", newLecturer);
        res.json({ status: true, message: 'Lecturer created successfully', data: newLecturer });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }

};

// Retrieve and return all lecturer from the database.
exports.findAll = async (req, res) => {
    try {
        const lecturer = await LecturerService.getLecturers();
        res.json({ status: true, message: "Data found", data: lecturer });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// update a lecturer identified by the lecturerId in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Lecturer data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Lecturer id is required' });
            return
        }
        //update lecturer
        const updatedLecturer = await LecturerService.updateLecturer(id, data);
        if (!updatedLecturer) {
            res.json({ status: false, message: `Cannot update Lecturer with id=${id}. Lecturer not found` });
            return;
        }
        console.log(updatedLecturer);
        res.json({ status: true, message: 'Lecturer updated successfully', data: updatedLecturer });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Delete a lecturer with list of id in the request

exports.delete = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.json({ status: false, message: 'Lecturer ids are required' });
            return;
        }
        console.log(ids);
        //delete lecturer
        const data = await LecturerService.deleteLecturers(ids);
        if (!data) {
            res.json({ status: false, message: `Cannot delete Lecturer with ids=${ids}. Lecturer not found` });
            return;
        }
        res.json({ status: true, message: 'Lecturer deleted successfully', data: data });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}


