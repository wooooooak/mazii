const mongoose = require('mongoose');

const UserMain = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    chatWait : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    chatAttended : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    Alarms : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Alarm'
        }]

});

module.exports = mongoose.model('UserMain', UserMain);