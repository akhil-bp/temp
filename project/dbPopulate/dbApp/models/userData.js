const mongoose = require('mongoose');
const Messages = require('./messages')

const schema = new mongoose.Schema({ 

    name: { type: String, default: "noname"}, 
    place: { type: String, default: "-" },
    state: { type: String, default: "-" }

},{ 
    timestamps: true 
});

module.exports = mongoose.model('User', schema);