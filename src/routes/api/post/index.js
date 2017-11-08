const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../../model/Posts');

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
                    console.log(cityArr);
                })
            }
        }).then((cityArr)=>{
            console.log(cityArr);
            res.send({
                posts : cityArr,
                user : req.user
            })
      }); 
    });

});

router.put('/chatRequest/:id',(req,res)=>{
    let postId = req.params.id;
    let userId = req.user._id;
    Post.findOne({'_id' : postId}).exec((err,post)=>{
        if(err) console.log(err)
        else{
            post.chatWait.push(mongoose.Types.ObjectId(userId));
        }
        post.save(err=>{
            if(err) console.log(err);
        })
    }).then(()=>{
        res.send("ok");
    });

});

