var express = require('express');
var router = express.Router();
var home = require('./home');
var users = require('./users');

const conArray = [home,users];

module.exports= function(app){
  conArray.forEach((controller)=>{
      controller(app);
  });
}
