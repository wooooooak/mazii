const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../../model/Posts');
const Alarm = require('../../../model/Alarms');
const User = require('../../../model/Users');
const utils = require('../../../utils');

module.exports = function(app){
    app.use('/api/alarm/',router);
}

router.post('/reqAccept',(req,res)=>{
    let reqUserId = req.body.reqUserId;
    let postId = req.body.postId;
    let alarmId = req.body.alarmId;
    User.findOne({'_id':reqUserId}).populate('chatAttendedPost').exec((err,user)=>{
        if(err) console.log(err);
        if(user){
            user.chatAttendedPost.push(mongoose.Types.ObjectId(postId));
            user.save(err=>{
                if(err)
                console.log(err);
            })
        }
    }).then(()=>{
        Post.findById(postId).exec((err,post)=>{
            if(err) console.log(err);
            post.chatAttendee.push(mongoose.Types.ObjectId(reqUserId));
            post.save(err=>{
                if(err) console.log(err);
            })
        })
    }).then(()=>{
        Alarm.findById(alarmId).exec((err,alarm)=>{
            if(err) console.log(err);
            alarm.checked = true;
            alarm.save(err=>{
                if(err) console.log(err);
            })
        })

        return res.status(200)
    })
    return res.status(500)
})

router.post('/reqRefuse',(req,res)=>{
    let alarmId = req.body.alarmId;
    Alarm.findById(alarmId).exec((err,alarm)=>{
        if(err) console.log(err);
        alarm.checked = true;
        alarm.save(err=>{
            if(err) console.log(err);
        })
    })
})
