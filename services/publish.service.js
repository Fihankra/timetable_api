const {Message, TableItem} = require('../schemas/publish.schema');

exports.getMessages = async () => {
    return await Message.find();
}


exports.saveTable = async (tables) => {
    //delete all tables with same configId
    await TableItem.deleteMany({ configId: tables[0].configId });
    return await TableItem.insertMany(tables);
}

exports.getTables = async (configId) => {
    return await TableItem.find({ configId: configId});
}
