const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    roomId : {type : String, required:true},
    userEmail : {type : String, required:true},
    imgUrl : String,
    userName : String,
    created_at: String,
    messageBody : String,
});

module.exports = mongoose.model('Message', Message);