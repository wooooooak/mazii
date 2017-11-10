const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../../model/Posts');
const Alarm = require('../../../model/Alarms');
const User = require('../../../model/Users');

module.exports = function(app){
    app.use('/api/post/',router);
}

//도시 이름으로 데이터 찾아주는 api
router.get('/getAllPostByCityName/:city',(req,res)=>{
    //req.params.city = Paris
    //find는 posts를 배열로 준다.
    //promise를 사용하지않으면 find함수가 끝나기도 전에 send해버려서 데이터가 정확하지않다.
    Post.find({'city' : req.params.city}).populate('author').exec((err,posts)=>{
        let cityArr = [];
        // let user = req.user;
        if(err) console.log(err)
        else{
            posts.forEach((post)=>{
                cityArr.push(post);
                // console.log(cityArr);
            })
        }
    }).then((cityArr)=>{
        res.send({
            posts : cityArr,
            user : req.user
        });
    });
});

//_id를 받아 post삭제하기
router.delete('/deleteById/:city/:id',(req,res)=>{
    Post.findOneAndRemove({'_id' : req.params.id}).remove().exec((err)=>{
        if(err) console.log(err);
        let cityArr = [];
        Post.find({'city' : req.params.city}).populate('author').exec((err,posts)=>{
            // let user = req.user;
            if(err) console.log(err)
            else{
                posts.forEach((post)=>{
                    cityArr.push(post);
                    // console.log(cityArr);
                })
            }
        }).then((cityArr)=>{
            // console.log(cityArr);
            res.send({
                posts : cityArr,
                user : req.user
            })
      }); 
    });

});

//채팅신청 버튼을 눌렀을 경우
router.put('/chatRequest/:id',(req,res)=>{
    let postId = req.params.id; //게시글의 id
    let userId = req.user._id; //채팅신청 보낸사람의 id
    let authorId;  //글 작성자 id
    Post.findOne({'_id' : postId}).exec((err,post)=>{
        if(err) console.log(err)
        else{
            post.chatWait.push(mongoose.Types.ObjectId(userId));
            authorId = post.author;
        }
        post.save(err=>{
            if(err) console.log(err);
        })
    }).then(()=>{
        
        //새로운 알람 doc을 만들고
        let alarm = new Alarm({
            to : mongoose.Types.ObjectId(authorId),
            from : mongoose.Types.ObjectId(userId),
            post : mongoose.Types.ObjectId(postId),
            checked : false
        });
        //알람을 db에 저장한다.
        alarm.save((err,alarm)=>{
            if(err) console.log(err);
        }).then((alarm)=>{   //알람 db 저장에 성공하면
            console.log("author ====== " + authorId);
            User.findOne({'_id' : authorId}).exec((err,user)=>{
                if(err) console.log(err);
                else{
                    //user doc에 alarm을 저장한다
                    user.Alarms.push(mongoose.Types.ObjectId(authorId))
                }
                user.save(err=>{
                    if(err) console.log(err);
                })
            })
            console.log(alarm);
        })

        res.send("ok");
    });

});

router.post('/getAllBetweenDate',(req,res)=>{
    let cityName = req.body.cityName;
    let startDate = new Date(req.body.startDate);
    let endDate = new Date(req.body.endDate);
    startDate.setHours(startDate.getHours() +9);
    endDate.setHours(endDate.getHours() +9);
    
    console.log(startDate);
    
    Post.find({
        'city' : cityName,
        'Date.start' : {$gte : startDate},
        'Date.end' : {$lt : endDate}
    }).populate('author').exec((err,posts)=>{
        if(err) console.log(err);
        if(!posts){
            console.log('데이터없음');
        }

        res.send({
            posts : posts,
            user : req.user
        })
    })
})
