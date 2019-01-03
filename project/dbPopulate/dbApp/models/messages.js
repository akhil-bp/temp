const mongoose = require('mongoose');
const User = require('./userData')
const schema = new mongoose.Schema({
    text: { type: String, default: ':#:' },
    starred: { type: Boolean, default: false },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

module.exports = mongoose.model('messages', schema);