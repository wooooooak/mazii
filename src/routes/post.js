const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const Post = require('../model/Posts');
const User = require('../model/Users');


//multer 이미지 업로드 세팅
uploadSetting = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/postImages');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
    limits : {fileSize:1*1}
  }),
});

module.exports = function(app){
    app.use('/',router);
  }

router.put('/post/postWrite',(req,res,next)=>{
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

  //ckeditor에서 이미지 업로드할때 사용
  // multer를 사용해 filename을 조작해 다시 에디터로 보내준다.
  // 이미지 업로드 화면에서 서버에 전송 버튼을 누를때 마다 한번씩 실행
  router.post('/post/uploadImage',uploadSetting.single('upload'),(req,res)=>{
    let tmpPath = req.file.path;
    let fileName = req.file.filename;
    let newPath = "../../public/images/postImages/" + fileName;
    fs.rename(tmpPath, newPath, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("fileName : " + fileName);
      let html;
      html = "";
      html += "<script type='text/javascript'>";
      html += " var funcNum = " + req.query.CKEditorFuncNum + ";";
      html += " var url = \"/images/postImages/" + fileName + "\";";
      html += " var message = \"업로드 완료\";";
      html += " window.parent.CKEDITOR.tools.callFunction(funcNum, url);";
      html += "</script>";
      res.send(html);
    });

  });

  //수정 페이지로 요청하는 url
  router.get('/post/postModify/:id',(req,res)=>{
    Post.findOne({'_id' : req.params.id}).exec((err,post)=>{
      if(err) console.log(err);
      console.log(post);
      let title = '수정하기';
      res.render('postModify',{
        user : req.user,
        title : title,
        travelInfo : post
        
      })
    })
  });

//_id를 받아 post수정하기
router.post('/post/modifyById/:id',(req,res)=>{
  let edit = req.body.editor1;
  console.log(req.body.editor1);
  Post.findOne({'_id' : req.params.id}).exec((err,post)=>{
    if(err) console.log(err);
    console.log(post);
    post.content = edit;

    post.save((err)=>{
      if(err) console.log(err);
    })
  }).then(post =>{
    console.log(post);
    res.render('city_feed',{
      user :req.user,
      title : 'gg',
      city : post.city
    })

  });
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

    post.save((err,post)=>{
      if(err) return console.error(err);
      console.log("post 등록 성공");
    });
  }

