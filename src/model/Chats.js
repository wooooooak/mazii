const mongoose = require('mongoose');

//post에 user:{type:Schema.ObjectId, ref:'User'}  을 하자 ObjectId는 User가 생길때마다 자동으로 User에 붙는 id이다.

const Chat = new mongoose.Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    
    content:String,
    chat:[String],
    chatWait:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
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



module.exports = mongoose.model('Chat', Chat);