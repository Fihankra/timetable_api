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

// //create message
// exports.createMessage = async (req, res) => {
//     try {
//         const message = req.body;
//         const result = await PublishService.saveMessage(message);
//         res.json({ status: true, message: "Data saved", data: result });

//     }
//     catch (err) {
//         res.json({ status: false, message: err.message });
//     }
// }
//get all messages
// exports.findAllMessages = async (req, res) => {
//     try {
//         const messages = await PublishService.getMessages();
//         res.json({ status: true, message: "Data found", data: messages });
//     }
//     catch (err) {
//         res.json({ status: false, message: err.message });
//     }
// }

//get all tables by year and semester

// exports.findAllTables = async (req, res) => {
//     try {


//         const configId = req.query.configId;
//         if (!configId) {
//             res.json({ status: false, message: "Config Id is required" });
//             return;
//         }
//         const configId = req.query.configId;
//         if(!configId){
//             res.json({ status: false, message: "Config Id is required" });
//             return;
//         }
       

//         const tables = await PublishService.getTables(configId);
//         res.json({ status: true, message: "Data found", data: tables });
//     }
//     catch (err) {
//         res.json({ status: false, message: err.message });
//     }
// }

//find table and message 
exports.findMessageAndTable = async (req, res) => {
    var data = req.query;
    console.log("data", data);
    if (!data) {
        res.json({ status: false, message: 'Provide Your Data' });
        return;
    }
    try {
        const message = await PublishService.findMessage(data.year, data.semester, data.studyMode);
        console.log("year", data.year, "semester", data.semester, "studyMode", data.studyMode);
        if (!message) {
            res.json({ status: false, message: `Message not found` });
            return;
        }
        const tables = (await PublishService.getTables(data.year, data.semester)).filter(table => table.studyMode.toLowerCase().includes(data.studyMode.toLowerCase())||data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase()));
        console.log("tables length", tables.length);
        if (!tables) {
            res.json({ status: false, message: `Tables not found` });
            return;
        }
        if (data.query == "Lecturer") {
            const lectTables = tables.filter(table => table.lecturerName.toLowerCase().includes( data.name.toLowerCase()));
        
            console.log("name", data.name);

            if (!lectTables) {
                res.json({ status: false, message: `No tables found for ${data.name} ` });
                return;
            }
            res.json({ status: true, message: "Data found", data: message, courses: lectTables });
        } else if (data.query == "Class") {
            const classTables = tables.filter(table => table.classNames.map((name)=>name.toLowerCase()).includes(data.name.toLowerCase()));
            if (!classTables) {
                res.json({ status: false, message: `No Tables Found for ${data.name}` });
                return;
            }
            res.json({ status: true, message: "Data found", data: message, courses: classTables });
        } else if (data.query == "Department") {
            const depTables = tables.filter(table => table.departmentName.toLowerCase().includes(data.name.toLowerCase())||data.name.toLowerCase().includes(table.departmentName.toLowerCase()));
            console.log("dep data length", depTables.length);
            if (!depTables) {
                res.json({ status: false, message: `Tables not found for department` });
                return;
            }
            res.json({ status: true, message: "Data found", data: message, courses: depTables });
        } else if (data.query == "studyMode") {
            const studyModeTables = tables.filter(table => table.studyMode.toLowerCase().includes(data.name.toLowerCase()));
            if (!studyModeTables) {
                res.json({ status: false, message: `No Tables Found for ${data.name}` });
                return;
            }
            res.json({ status: true, message: "Data found", data: message, courses: studyModeTables });
        }
    }
    catch (err) {
        res.json({ status: false, message: err.message });

    }
}