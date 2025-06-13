const ProgramService = require("../services/program.service");
const classSchema = require("../schemas/class.schema");
const courseSchema = require("../schemas/courses/program.course.schema");
const electivesSchema = require("../schemas/courses/electives.course.schema");

// Create and Save a new Program

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      res.json({ status: false, message: "Program data is required" });
      return;
    }
    const program = await ProgramService.getProgramById(data.id);
    if (program && program.length > 0) {
      res.json({
        status: false,
        message: "Program with the same details already exists",
      });
      return;
    }
    //create Program
    const newProgram = await ProgramService.createProgram(data);
    if (!newProgram) {
      res.json({ status: false, message: "Failed to  create Program" });
      return;
    }
    res.json({
      status: true,
      message: "Program created successfully",
      data: newProgram,
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

// Retrieve and return all Programs from the database.
exports.findAll = async (req, res) => {
  try {
    const programsList = await ProgramService.getPrograms();
    res.json({ status: true, message: "Data found", data: programsList });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

// update a Program identified by the ProgramId in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!data) {
      res.json({ status: false, message: "Program data is required" });
      return;
    }
    if (!id) {
      res.json({ status: false, message: "Program id is required" });
      return;
    }
    //update Program
    const updatedProgram = await ProgramService.updateProgram(id, data);
    if (!updatedProgram) {
      res.json({
        status: false,
        message: `Cannot update Program with id=${id}. Program not found`,
      });
      return;
    }
    res.json({ status: true, message: "Program updated", data: data });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

// Delete a Programs with list of id in the request

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    const program = req.body;
    if (!program) {
      res.json({ status: false, message: "Program ids are required" });
      return;
    }
    const data = await ProgramService.deleteProgram(program);
    if (!data) {
      res.json({
        status: false,
        message: `Cannot delete Program with ids=${ids}. Program not found`,
      });
      return;
    }
    await classSchema.deleteMany({ programId: program.id }).then((result) => {
      if (result.deletedCount > 0) {
        console.log("Classes deleted successfully");
      } else {
        console.log("No classes found for the given program");
      }
    });
    //delete all courses associated with the departments
    await courseSchema.deleteMany({ programId: program.id }).then((result) => {
      if (result.deletedCount > 0) {
        console.log("Courses deleted successfully");
      } else {
        console.log("No courses found for the given program");
      }
    }).catch((err) => {
      console.error("Error deleting courses:", err);
    });
    //delete all elective courses associated with the departments
    await electivesSchema.deleteMany({ programId: program.id }).then((result) => {
      if (result.deletedCount > 0) {
        console.log("Elective courses deleted successfully");
      } else {
        console.log("No elective courses found for the given program");
      }
    }).catch((err) => {
      console.error("Error deleting elective courses:", err);
    });

    res.json({
      status: true,
      message: "Program deleted successfully",
      data: program,
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};
