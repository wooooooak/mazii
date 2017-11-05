const express = require('express');
const router = express.Router();

const Post = require('../model/Posts');

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
    let city = req.body.city;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    insertPost(req.body);
    console.log(city +''+ startDate);
    res.redirect('/'+city)
  });

  
  function insertPost(reqBody){
    let post = new Post({
      city : reqBody.city,
      content : reqBody.editor1,
      Date :{
        start : reqBody.startDate,
        end : reqBody.endDate
      }
    });

    post.save((err,post)=>{
      if(err) return console.error(err);
      console.dir(post);
    });
  }