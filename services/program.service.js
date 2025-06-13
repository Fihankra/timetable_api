const Program = require('../schemas/program.schema');

exports.createProgram = async (program) => {
    return await Program.create(program);
}

exports.getPrograms = async () => {
    return await Program.find();
}

exports.getProgramById = async (id) => {
    return await Program.find({ id: id });
}

exports.updateProgram = async (id, program) => {
    return await Program.findOneAndUpdate({ id: id }, program);
}

exports.deleteProgram = async (deleteProgram) => {
    return await Program.deleteOne({ id: deleteProgram.id });
}


