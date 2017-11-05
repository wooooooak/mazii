const express = require('express');
const router = express.Router();

module.exports = function(app){
    app.use('/',router);
  }

router.get('/post/postWrite',(req,res,next)=>{
    let title = "여행";
    res.render('postWrite',{
      user : req.user,
      title : title
    })
  });
  
  
  //req.body에는 {startDate:'~~~~/~~/~~',endDate:'~~~~/~~/~~',city:'~'}
  router.post('/post/toPostPage',(req,res,next)=>{
    let title = "글쓰기";
    console.dir(req.body);
      res.render('postWrite',{
        user: req.user,
        title : title,
        travelInfo : req.body
      });
  });
  
  router.post('/post/finish',(req,res,next)=>{
    res.render('index',{
      user:req.user,
      title:'adsf'
    });
  })