const express = require('express');
const router = express.Router();

const Post = require('../../../model/Posts');

module.exports = function(app){
    app.use('/api/post/',router);
}

router.get('/getAllPostByCityName/:city',(req,res)=>{
    //req.params.city = Paris
    //find는 posts를 배열로 준다.
    //promise를 사용하지않으면 find함수가 끝나기도 전에 send해버려서 데이터가 정확하지않다.
    Post.find({'city' : req.params.city}).populate('author').exec((err,posts)=>{
        let cityArr = [];
        if(err) console.log(err)
        else{
            posts.forEach((post)=>{
                cityArr.push(post);
                // console.log(cityArr);
            })
        }
    }).then((cityArr)=>{
        // console.log(cityArr+'=============');
        res.send({
            data : cityArr
        });
    });
});


