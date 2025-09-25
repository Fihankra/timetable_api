const PublishService = require("../services/publish.service");
const DepartmentService = require("../services/department.service");
const ProgramsService = require("../services/program.service");
const LecturerService = require("../services/lecturer.service");
const ClassService = require("../services/class.service");
//create message
const stringSimilarity = require("string-similarity");
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
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

//get all messages

//create message
exports.createMessage = async (req, res) => {
  try {
    const message = req.body;
    const result = await PublishService.saveMessage(message);
    res.json({ status: true, message: "Data saved", data: result });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};
//get all messages
exports.findAllMessages = async (req, res) => {
  try {
    const messages = await PublishService.getMessages();
    res.json({ status: true, message: "Data found", data: messages });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

//find table and message
exports.findMessageAndTable = async (req, res) => {
  var data = req.query;
  if (!data) {
    res.json({ status: false, message: "Provide Your Data" });
    return;
  }
  try {
    const message = await PublishService.findMessage(
      data.year,
      data.semester,
      data.studyMode
    );

    if (!message) {
      res.json({ status: false, message: `Message not found` });
      return;
    }
    console.log("Year and Sem===",data.year,"==============",data.semester)
    const tables = await PublishService.getTables(data.year, data.semester);

    if (!tables) {
      res.json({ status: false, message: `Tables not found` });
      return;
    }

    // through the tables get program id and get the program name
      if (data.query == "Lecturer") {
      const year = data.year;
      const semester = data.semester;

      const lecturersList = await LecturerService.getLecturers({
        year,
        semester,
      });
      if (!lecturersList || lecturersList.length === 0) {
        res.json({ status: false, message: `Lecturers not found` });
        return;
      }

      const lecturerNames = lecturersList.map((lecturer) =>
        lecturer.name.toLowerCase()
      );

      // Find the best match against the user-provided name
      const bestMatch = stringSimilarity.findBestMatch(
        data.name.toLowerCase(),
        lecturerNames
      );

      // Get the matching lecturer object (if needed)
      const bestLecturer = lecturersList.find(
        (lecturer) => lecturer.name.toLowerCase() === bestMatch.bestMatch.target
      );
      if (!bestLecturer) {
        res.json({ status: false, message: `Lecturer not found` });
        return;
        }
        console.log("Lecturer ====================", bestLecturer)

      const lectTables = tables.filter(
        (table) =>
          table.lecturerName
            .toLowerCase()
            .includes(bestLecturer.name.toLowerCase()) &&
          data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase())
      );

      if (!lectTables) {
        res.json({
          status: false,
          message: `No tables found for ${data.name} `,
        });
        return;
      }
      res.json({
        status: true,
        message: "Data found",
        data: message,
        courses: lectTables,
      });
    } else if (data.query == "Class") {
      const year = data.year;
        const semester = data.semester;
        //console.log("Year", year);
        //console.log("Semester", semester);
        const classes = await ClassService.getClasses({ year, semester });
        //console.log("Classes length", classes.length);
        if (!classes || classes.length === 0) {
            res.json({ status: false, message: `Classes not found` });
            return;
        }
        //console.log("Classes", classes);
        // Find the best match against the user-provided name
        const classNames = classes.map((cls) => cls.name.toLowerCase());
       // console.log("Class Names", classNames);
        const bestMatch = stringSimilarity.findBestMatch(
            data.name.toLowerCase(),
            classNames
        );
        //console.log("Best Match", bestMatch);
        // Get the matching class object (if needed)
        const bestClass = classes.find(
            (cls) => cls.name.toLowerCase() === bestMatch.bestMatch.target
        );
       console.log("Best Class", bestClass.name);
        if (!bestClass) {
            res.json({ status: false, message: `Class not found` });
            return;
        }
        //console.log("Best Class", bestClass);
        // Filter the tables based on the class name and study mode
        

      const classTables = tables.filter(
        (table) =>
          table.classNames
            .map((name) => name.toLowerCase())
            .includes(bestClass.name.toLowerCase()) &&
          data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase())
      );
      if (!classTables) {
        res.json({
          status: false,
          message: `No Tables Found for ${data.name}`,
        });
        return;
      }
      res.json({
        status: true,
        message: "Data found",
        data: message,
        courses: classTables,
      });
    } else if (data.query == "Department") {
      const departments = await DepartmentService.getDepartments();

      if (!departments) {
        res.json({ status: false, message: `Tables not found for department` });
        return;
      }
      // Find the department that matches the name
      // using string similarity to find the best match
      const departmentNames = departments.map((dept) =>
        dept.name.toLowerCase()
      );

      const bestMatch = stringSimilarity.findBestMatch(
        data.name.toLowerCase(),
        departmentNames
      );

      const department = departments.filter(
        (depart) =>
          depart.name.toLowerCase() === bestMatch.bestMatch.target.toLowerCase()
      );

      if (!department) {
        res.json({ status: false, message: `Department not found` });
        return;
      }
      const dipId = department[0].id;
      const depTables = tables.filter(
        (table) =>
          (table.departmentId.includes(dipId) ||
            table.departmentName
              .toLowerCase()
              .includes(data.name.toLowerCase())) &&
          data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase())
      );
      console.log("Department", depTables.length);
      if (!depTables) {
        res.json({ status: false, message: `Tables not found for department` });
        return;
        }
        depTables.forEach((table) => {
          table.departmentName = department[0].name;
        });

      res.json({
        status: true,
        message: "Data found",
        data: message,
        courses: depTables,
      });
    } else if (data.query == "studyMode") {
      const studyModeTables = tables.filter((table) =>
        data.studyMode.toLowerCase().includes(table.studyMode.toLowerCase())
      );
      if (!studyModeTables) {
        res.json({
          status: false,
          message: `No Tables Found for ${data.name}`,
        });
        return;
      }
      res.json({
        status: true,
        message: "Data found",
        data: message,
        courses: studyModeTables,
      });
    }
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};
