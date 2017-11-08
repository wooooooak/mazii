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
    chat:[String],
    chatWait:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    chatOk:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }]
},
{
    timestamps:true
});


// const Post = new mongoose.Schema({
//     author : String, //author name
//     city : String,
//     email : String,
//     Date: {
//         start : Date,
//         end : Date,
//     },
//     content:String,
//     upvote:Number,
//     count:Number, //조회수
//     chat:[String],
// },
// {
//     timestamps:true
// });



module.exports = mongoose.model('Post', Post);