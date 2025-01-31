const ElectiveCourseService = require('../../services/courses/electives.course.service');


exports.createElectives = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Elective data is required' });
            return;
        }
        //check if electives already exists
        const electives = await ElectiveCourseService.getElectiveById(data.id);
        if (electives && electives.length > 0) {
            res.json({ status: false, message: 'Elective with the same details already exists' });
            return;
        }

        const newElective = await ElectiveCourseService.createElective(data);
        if (!newElective) {
            res.json({ status: false, message: 'Failed to create elective' });
            return;
        }
        const electivesList = await ElectiveCourseService.getElectives();
        res.json({ status: true, message: 'Elective created successfully', data: electivesList });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


exports.findAllElectives = async (req, res) => {
    try {
        const electives = await ElectiveCourseService.getElectives();
        res.json({ status: true, message: "Data found", data: electives });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

exports.updateElectives = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!data) {
            res.json({ status: false, message: 'Elective data is required' });
            return;
        }
        if (!id) {
            res.json({ status: false, message: 'Elective id is required' });
            return
        }
        //get old elective data
        const elective = await ElectiveCourseService.getElectiveById(id);
        if (!elective || elective.length === 0) {
            res.json({ status: false, message: `Cannot update Elective with id=${id}. Elective not found` });
            return;
        }

        //update electives
        const updatedElective = await ElectiveCourseService.updateElective(id, data);
        if (!updatedElective) {
            res.json({ status: false, message: `Cannot update Elective with id=${id}. Elective not found` });
            return;
        }
        const electivesList = await ElectiveCourseService.getElectives();
        res.json({ status: true, message: 'Elective updated successfully', data: electivesList });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.deleteElectives = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.json({ status: false, message: 'Elective ids are required' });
            return;
        }
        //delete electives
        const deletedElectives = await ElectiveCourseService.deleteElectives(ids);
        if (!deletedElectives) {
            res.json({ status: false, message: `Cannot delete Elective with ids=${ids}. Elective not found` });
            return;
        }
        const electivesList = await ElectiveCourseService.getElectives();
        res.json({ status: true, message: 'Elective deleted successfully', data: electivesList });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}
