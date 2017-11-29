const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../model/Posts');
const User = require('../model/Users');
const Alarm = require('../model/Alarms');
const utils = require('../utils');

const url = require('url');

module.exports = function(app){
    app.use('/',router);
    
  }

  //alarm 메시지 확인하는 페이지로 요청
router.get('/alarm', function(req, res, next) {
    let title = '여행';
    let emailIds = [];
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.'); //사실 로그인 안하면 alarm으로 이동하는 버튼이 없다.
        res.render('alarm.ejs',{user:null,title:title});
    }else{
        Alarm.find({'to':req.user._id}).populate(['from','post']).sort({'createdAt':'desc'}).exec((err,alarm)=>{
          alarm.forEach(alarm => {
            emailIds.push(utils.getEmailId(alarm.from))
          });

        }).then((alarm)=>{
          res.render('alarm.ejs',{
            user : req.user,
            title : title,
            Alarms : alarm,
            emailIds : emailIds
          });
          
        })
    }
  });