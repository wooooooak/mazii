const mongoose = require('mongoose');

//post에 user:{type:Schema.ObjectId, ref:'User'}  을 하자 ObjectId는 User가 생길때마다 자동으로 User에 붙는 id이다.

const Post = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    city : String,
    Date: {
        start : Date,
        end : Date,
    },
    content:String,
    upvote:Number,
    count:Number, //조회수
    // chatRoomName : {type : String, lowercase:true, unique:true}, //그냥_id로..
    message:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    }],
    chatWait:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    chatOk:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    chatAttendee:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
},
{
    timestamps:true
});



module.exports = mongoose.model('Post', Post);