const mongoose = require('mongoose');


//로그인 정보만 입력됨
const Alarm = new mongoose.Schema({
    to: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    from:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },   
    post:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    checked:Boolean,
},
{
    timestamps:true
});

module.exports = mongoose.model('Alarm', Alarm);