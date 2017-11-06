const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const Post = require('../model/Posts');
const User = require('../model/Users');


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
    let userId = ObjectId;
    let email = req.body.email;
    let city = req.body.city;
    User.findOne({email:email}).exec((err,user)=>{
      if(err) console.log("에러입니다");
      else{
        userId = user._id;
        // console.log("typeof userId "+typeof(userId));
      }
    }).then(()=>{
      // console.log(city +''+ startDate +", "+email );
      insertPost(req.body,userId);
    })
    res.redirect('/city/'+city)
  });

  
  function insertPost(reqBody,userId){
    let post = new Post({
      city : reqBody.city,
      author : mongoose.Types.ObjectId(userId),
      content : reqBody.editor1,
      Date :{
        start : reqBody.startDate,
        end : reqBody.endDate
      },
      count : 0,
      upvote : 0,
      chat : []
    });
    // let post = new Post({
    //   city : reqBody.city,
    //   author : reqBody.name,
    //   email : reqBody.email,
    //   picture : reqBody.picture,
    //   content : reqBody.editor1,
    //   Date :{
    //     start : reqBody.startDate,
    //     end : reqBody.endDate
    //   },
    //   count : 0,
    //   upvote : 0,
    //   chat : []
    // });

    post.save((err,post)=>{
      if(err) return console.error(err);
      console.log("post 등록 성공");
    });
  }