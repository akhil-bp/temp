const User = require('../models/userData');

module.exports.createUser = (params) => {
    return new User(params).save();
};

module.exports.getUser = (query) => {
    return User.findOne(query).lean().exec();
};

module.exports.getUsers = (query) => {
    return User.find(query).lean().exec();
};

module.exports.updateUser = (query, data) => {
    return User.update(query, data).exec();
};