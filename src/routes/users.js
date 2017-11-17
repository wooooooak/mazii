var express = require('express');
var router = express.Router();
var passport = require('passport');
const Post = require('../model/Posts');
const User = require('../model/Users');

/* GET users listing. */
module.exports = function(app){
  app.use('/',router);
  
}

//페이스북 소셜 로그인
router.get('/auth/facebook',(passport.authenticate('facebook',{
  scope:'email'
})));
// 패스포트 - 페이스북 인증 콜백 라우팅
router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {
  successRedirect : '/',
  failureRedirect : '/profile'
}));

//구글 소셜 로그인
router.get('/auth/google',(passport.authenticate('google',{
  scope:'email'
})));
// 패스포트 - 페이스북 인증 콜백 라우팅
router.route('/auth/google/callback').get(passport.authenticate('google', {
  successRedirect : '/',
  failureRedirect : '/profile'
}));

//다른사람의 프로필을 눌렀을 경우
router.get('/auth/profile/:email',(req,res)=>{
    let userEmail = req.params.email;
    console.log(userEmail);
    if(!req.params.email){
      userEmail = req.user.email;
    }
    let otherUser; 
    User.findOne({'email':userEmail}).exec((err,user)=>{
      if(err) console.log(err);
      otherUser = user;
      console.log(otherUser);
    }).then((user)=>{
      res.render('profile.ejs',{
        user : req.user,
        otherUser : user
      });

    });
});

router.get('/auth/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
})