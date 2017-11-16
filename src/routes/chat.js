const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../model/Posts');
const User = require('../model/Users');
const Alarm = require('../model/Alarms');

const url = require('url');

module.exports = function(app){
    app.use('/',router);
    
  }

//채팅 리스트 보는페이지로 요청
router.get('/chatList', function(req, res, next) {
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.'); //사실 로그인 안하면 chatList로 이동하는 버튼이 없다.
        res.render('chat_list.ejs',{user:null});
    }else{
      console.log("req.user.id = "+req.user._id);
        User.findById(req.user._id).populate(['chatAttendedPost',
                  {path:'chatAttendedPost',populate:{path:'author'}},
                  {path:'chatAttendedPost',populate:{path:'chatAttendee'}}]).exec((err,user)=>{
          // console.log(alarm);
          res.render('chat_list.ejs',{
            user : user
          });
  
        })
      }
    });
    