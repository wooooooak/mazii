const express = require('express');
const router = express.Router();
const home = require('./home');
const users = require('./users');
const post = require('./post');

const apiPost = require('./api/post');
const apiUser = require('./api/user');
const apiAlarm = require('./api/alarm');

const conArray = [home,users,post];
const apiArray = [apiPost,apiUser,apiAlarm];

module.exports= function(app){
  conArray.forEach((controller)=>{
      controller(app);
  });
  apiArray.forEach((controller)=>{
      controller(app);
  });

}
