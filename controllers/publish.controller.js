const PublishService = require('../services/publish.service');


//create message
exports.createMessageTable = async (req, res) => {
    try {
        const message = req.body.message;
        const tables = req.body.tables;
        console.log("message",tables[0]);
        if (!message) {
            res.json({ status: false, message: "Message is required" });
            return;
        }
        if (!tables) {
            res.json({ status: false, message: "Tables are required" });
            return;
        }

        const result1 = await PublishService.saveMessage(message);
        const result2 = await PublishService.saveTable(tables);
        res.json({ status: true, message: "Tables published successfully" });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}
//get all messages

//create message
exports.createMessage = async (req, res) => {
    try {
        const message = req.body;
        const result = await PublishService.saveMessage(message);
        res.json({ status: true, message: "Data saved", data: result });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}
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
       
        const configId = req.query.configId;
        if(!configId){
            res.json({ status: false, message: "Config Id is required" });
            return;
        }
       
        const tables = await PublishService.getTables(configId);
        res.json({ status: true, message: "Data found", data: tables });
    }
    catch (err) {
        res.json({ status: false, message: err.message });
    }
}