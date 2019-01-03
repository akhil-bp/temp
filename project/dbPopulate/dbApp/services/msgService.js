const Message = require('../models/messages');

module.exports.createMsg = (params) => {
    return new Message(params).save();
};

module.exports.getMsg = (query) => {
    return Message.findOne(query).lean().exec();
};

module.exports.getMsgs = (query) => {
    return Message.find(query).lean().exec();
};

module.exports.getMessages = (query, project={}, filter) => {
    return Message.find(query, project, filter).populate('userId').lean().exec();
};

module.exports.updateMsg = (query, data) => {
    return Message.update(query, data).exec();
};