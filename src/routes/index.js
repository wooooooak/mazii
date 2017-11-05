const express = require('express');
const router = express.Router();
const home = require('./home');
const users = require('./users');
const post = require('./post');

const conArray = [home,users,post];

module.exports= function(app){
  conArray.forEach((controller)=>{
      controller(app);
  });
}
