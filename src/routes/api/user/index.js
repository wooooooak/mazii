const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Post = require('../../../model/Posts');
const User = require('../../../model/Users');

module.exports = function(app){
    app.use('/api/user/',router);
}

//


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
                data:cityArr
            })
    });
    
});

});

