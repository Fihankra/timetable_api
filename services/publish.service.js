const { Message, TableItem } = require('../schemas/publish.schema');

exports.saveMessage = async (message) => {
    //replace existing message with same id
    await Message.deleteOne({ id: message.id });
    return await Message.create(message);
}

exports.getMessages = async () => {
    return await Message.find();
}


exports.saveTable = async (tables) => {
    //delete all tables with same configId
    await TableItem.deleteMany({ configId: tables[0].configId });
    return await TableItem.insertMany(tables);
}

exports.getTables = async (year,semester) => {
    return await TableItem.find({ year: year, semester: semester });
}

exports.findMessage = async (year, semester,studyMode) => {
    return await Message.findOne({ year: year, semester: semester,studyMode:studyMode });
}


exports.findByLecturer = async (configId, lecturer) => {
    return await TableItem.find({ configId: configId, lecturerName: lecturer });
}

exports.findByClass = async (configId, className) => {
    return await TableItem.find({ configId: configId, classNames:{"$in":className} });
}