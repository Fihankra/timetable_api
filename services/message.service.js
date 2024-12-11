const Message = require('../schemas/message.schema');


//get all messages
exports.getMessages = async () => {
    return await Message.find();
}