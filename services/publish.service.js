const {Message, TableItem} = require('../schemas/publish.schema');

exports.getMessages = async () => {
    return await Message.find();
}


exports.getTables = async (year, semester) => {
    return await TableItem.find({ year: year, semester: semester });
}