const PublishService = require('../services/publish.service');

//get all messages

exports.findAllMessages = async (req, res) => {
    try {
        const messages = await PublishService.getMessages();
        res.json({ status: true, message: "Data found", data: messages });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}

//get all tables by year and semester

exports.findAllTables = async (req, res) => {
    try {
        const year = req.params.year;
        const semester = req.params.semester;
        if(!year || !semester){
            res.json({ status: false, message: "Year and semester are required" });
            return;
        }
        const tables = await PublishService.getTables(year, semester);
        res.json({ status: true, message: "Data found", data: tables });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}