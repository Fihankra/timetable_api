const PublishService = require('../services/publish.service');
const DepartmentService = require('../services/department.service')
const ProgramsService = require('../services/program.service')
        //create message
        exports.createMessageTable = async (req, res) => {
            try {
                const message = req.body.message;
                const tables = req.body.tables;
                console.log("message", tables[0]);
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

        //find table and message 
        exports.findMessageAndTable = async (req, res) => {
            var data = req.query;
            if (!data) {
                res.json({ status: false, message: 'Provide Your Data' });
                return;
            }
            try {
                const message = await PublishService.findMessage(data.year, data.semester, data.studyMode);
              
                if (!message) {
                    res.json({ status: false, message: `Message not found` });
                    return;
                }
                const tables = await PublishService.getTables(data.year, data.semester);
        
                if (!tables) {
                    res.json({ status: false, message: `Tables not found` });
                    return;
                }
                // const departments = await DepartmentService.getDepartments();
                // const programs = await ProgramsService.getPrograms();
                // console.log("Tables", tables.length);
                // console.log("Programs", programs.length);
                // console.log("Departments", departments.length);
                //  tables.forEach(async (table) => {
                //     const programId = table.programId;
                //     const program = programs.find(program => program.id == programId);
                //     console.log("Program", program);
                //     if (program) {
                //         const department = departments.find(department => department.id == program.departmentId);
                //         table.programName = program.name;
                //         table.programId = program.id;
                //         table.departmentName = department.name;
                //         table.departmentId = department.id;
                //         //save the table
                //         await PublishService.updateTable(table);
                //         console.log("Percentage", tables.indexOf(table) / tables.length * 100);
                //     }
                // });
                //llop through the tables get program id and get the program name
                if (data.query == "Lecturer") {
                    const lectTables = tables.filter(table => table.lecturerName.toLowerCase().includes(data.name.toLowerCase())&&data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase()));

                    if (!lectTables) {
                        res.json({ status: false, message: `No tables found for ${data.name} ` });
                        return;
                    }
                    res.json({ status: true, message: "Data found", data: message, courses: lectTables });
                } else if (data.query == "Class") {
                    const classTables = tables.filter(table => table.classNames.map((name) => name.toLowerCase()).includes(data.name.toLowerCase())&&data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase()));
                    if (!classTables) {
                        res.json({ status: false, message: `No Tables Found for ${data.name}` });
                        return;
                    }
                    res.json({ status: true, message: "Data found", data: message, courses: classTables });
                } else if (data.query == "Department") {
                    const departments =await DepartmentService.getDepartments();
                  
                    if (!departments){
                        res.json({ status: false, message: `Tables not found for department` });
                        return; 
                    }
                    const department = departments.filter(depart => depart.name.toLowerCase().includes(data.name.toLowerCase()));
                    if (!department) {
                        res.json({ status: false, message: `Department not found` });
                        return;
                    }
                    const dipId = department[0].id
                    const depTables = tables.filter(table => (table.departmentId.includes(dipId) || table.departmentName.toLowerCase().includes(data.name.toLowerCase()))&&data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase()));
                    console.log("Department", depTables.length);
                    if (!depTables) {
                        res.json({ status: false, message: `Tables not found for department` });
                        return;
                    }
                    res.json({ status: true, message: "Data found", data: message, courses: depTables });
                } else if (data.query == "studyMode") {
                    const studyModeTables = tables.filter(table => data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase()));
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
    
