var express = require('express');
var router = express.Router();


module.exports = function(app){
    app.use('/',router);
    
  }
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
      title: 'Express from server folder',
      user : req.user
    });
});

router.get('/cities', function(req, res, next) {
  res.render('cities', { 
      title: 'Express from server folder',
      user : req.user
    });
});

