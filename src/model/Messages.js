const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    room : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    messageBody : String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', Message);