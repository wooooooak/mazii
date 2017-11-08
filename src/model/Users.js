const mongoose = require('mongoose');


const User = new mongoose.Schema({
    email: String,
    name : String,
    authToken:String,
    provider: String,    
    google:{},
    facebook:{},
    chatWait:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    chatOk:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }]
});

module.exports = mongoose.model('User', User);