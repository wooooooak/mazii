const express = require('express');
const router = express.Router();
const passport = require('passport');
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
  failureRedirect : '/'
}));
// 패스포트 - 페이스북 인증 콜백 라우팅
router.route('/auth/google/callback').get(passport.authenticate('google', {
  successRedirect : '/',
  failureRedirect : '/profile'
}));

//프로필을 눌렀을 경우
router.get('/auth/profile/:email',(req,res)=>{
    let userEmail = req.params.email;
    console.log(userEmail);
    if(!req.params.email){
      userEmail = req.user.email;
    }
    let profileUser; 
    User.findOne({'email':userEmail}).exec((err,user)=>{
      if(err) console.log(err);
      profileUser = user;
      console.log(profileUser);
    }).then((user)=>{
      let emailId = getEmailId(user);
      res.render('profile.ejs',{
        user : req.user,
        profileUser : user,
        emailId : emailId
      });
    });
});

router.get('/auth/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
})

function getEmailId(user){
  let email = user.email;
  console.log(email.indexOf('@')); 
  let emailId = email.slice(0,email.indexOf('@'));
  return emailId;
}