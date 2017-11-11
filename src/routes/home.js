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
/* GET home page. */
//인기글을 보여줘야 하지만 일단은 최신꺼만 6개 보여주자
router.get('/', function(req, res, next) {
  // let dateInfoArr=[];
  Post.find().limit(9).sort({'createAt':'asc'}).populate('author').exec((err,posts)=>{
    if(err) console.log(err);
    // posts.forEach((post,index)=>{
    //   let data = new Date(post.Date.start);
    //   var 
    // })

    res.render('index', { 
      title: '여행',
      user : req.user,
      popularPost : posts
      // dateInfoArr : dateInfoArr
    });
  })
});



router.get('/cities', function(req, res, next) {
  let title = '여행';
  if (!req.user) {
      console.log('사용자 인증 안된 상태임.');
      res.render('cities.ejs',{user:null,title:title});
    }else{
      if (Array.isArray(req.user)) {
        res.render('cities.ejs', {user: req.user[0]._doc,title:title});
    } else {
        res.render('cities.ejs', {user: req.user,title:title});
    }
  }
});

router.get('/city/:city',(req,res,next)=>{
  //url에서 도시 이름 구하기
  let cityName = removeWhitespace(req.params.city); //"HongKong"과 같은 도시 이름저장
  // console.log(cityName + "======================");
  let title = '여행';
  if (!req.user) {
    console.log('사용자 인증 안된 상태임.');
    res.render('city_feed.ejs',{
      user : null,
      title : title,
      city : cityName
      });
    }else{
      if (Array.isArray(req.user)) {
        res.render('city_feed.ejs', {user: req.user[0]._doc,
          title : title,
          city : cityName
        });
    } else {
        res.render('city_feed.ejs', {user: req.user,
          title : title,
          city : cityName
        });
    }
  }
});

//alarm 메시지 확인하는 페이지로 요청
router.get('/alarm', function(req, res, next) {
  let title = '여행';
  if (!req.user) {
      console.log('사용자 인증 안된 상태임.'); //사실 로그인 안하면 alarm으로 이동하는 버튼이 없다.
      res.render('alarm.ejs',{user:null,title:title});
  }else{
    console.log(req.user);
      Alarm.find({'to':req.user._id}).populate(['from','post']).exec((err,alarm)=>{
        console.log("알람 =");
        console.log(alarm);
        res.render('alarm.ejs',{
          user : req.user,
          title : title,
          Alarms : alarm
        });
      })
  }
});

//채팅 리스트 보는페이지로 요청
router.get('/chatList', function(req, res, next) {
  if (!req.user) {
      console.log('사용자 인증 안된 상태임.'); //사실 로그인 안하면 chatList로 이동하는 버튼이 없다.
      res.render('chatList.ejs',{user:null});
  }else{
    console.log("req.user.id = "+req.user._id);
      User.findById(req.user._id).populate(['chatAttendedPost',
                {path:'chatAttendedPost',populate:{path:'author'}},
                {path:'chatAttendedPost',populate:{path:'chatAttendee'}}]).exec((err,user)=>{
        // console.log(alarm);
        res.render('chatList.ejs',{
          user : user
        });

      })
    }
  });
  

// url의 pathname이 Mexico city -> Mexicocity로 파싱
function removeWhitespace(pathname){
  let pathArr = Array.from(pathname);
  // console.log(pathArr);
  let index = pathArr.indexOf(' ');
  // console.log(index);
  if(index===-1){
    return pathArr.join('');
  }else{
    pathArr.splice(index,1);
    return pathArr.join('');
  }
}


