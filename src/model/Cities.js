const mongoose = require('mongoose');

//post에 user:{type:Schema.ObjectId, ref:'User'}  을 하자 ObjectId는 User가 생길때마다 자동으로 User에 붙는 id이다.

const City = new mongoose.Schema({
    email: {type: String, 'default':''},
    name : String,
    authToken:String,
    provider: String,    
    google:{},
    facebook:{},
    chat:[String]
});

module.exports = mongoose.model('City', City);