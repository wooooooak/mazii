const mongoose = require('mongoose');


//로그인 정보만 입력됨
const User = new mongoose.Schema({
    email: String,
    name : String,
    authToken:String,
    provider: String,    
    facebook:{},
    Alarms : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Alarm'
    }],
    //아래는 필요없을듯
    chatWait:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    //채팅에 참여중인 post들
    chatAttendedPost : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }]
});

module.exports = mongoose.model('User', User);