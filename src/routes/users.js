var express = require('express');
var router = express.Router();
var passport = require('passport');

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

router.get('/profile',(req,res)=>{
  // 인증 안된 경우
  if (!req.user) {
    console.log('사용자 인증 안된 상태임.');
    res.redirect('/');
  } else {
      console.log('사용자 인증된 상태임.');
      console.log('/profile 패스 요청됨.');
      console.dir(req.user);

      if (Array.isArray(req.user)) {
          res.render('profile.ejs', {user: req.user[0]._doc});
      } else {
          res.render('profile.ejs', {user: req.user});
      }
  }
});

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
})