const mongoose = require('mongoose');

//post에 user:{type:Schema.ObjectId, ref:'User'}  을 하자 ObjectId는 User가 생길때마다 자동으로 User에 붙는 id이다.

const Post = new mongoose.Schema({
    author : String, //author name
    city : String,
    Date: {
        start : Date,
        end : Date
    },
    content:String,     
    upvote:Number,
    chat:[String]
});

module.exports = mongoose.model('Post', Post);