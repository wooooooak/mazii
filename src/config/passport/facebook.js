
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var User = require('../../model/Users');

module.exports = function(app, passport) {
	return new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
		profileFields: ['id', 'displayName', 'email','picture.type(large)']
	}, function(accessToken, refreshToken, profile, done) {
		// console.log('passport의 facebook 호출됨.');
		// console.dir(profile);
		
		var options = {
		    criteria: { 'facebook.id': profile.id }
		};
		
	    User.findOne(options.criteria).populate('Alarms').exec(function (err, user) {
			if (err) return done(err);
			if (!user) {
				let email ;
				if(!profile.emails){
					email = user._id;
				}
				console.dir(profile);
				var user = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					provider: 'facebook',
					authToken: accessToken,
					facebook: profile._json
				});

				let userId = user._id;
				console.log("userId = "+user._id);
				

				user.save(function (err) {
					if (err) console.log(err);
					 done(err, user);
				});
			} else {
				done(err, user);
			}
	    })
	});
};

// UserMain.findOne({user : userId},(err,userMain)=>{
// 	if(err) console.log(err);;
// 	if(!userMain){
// 		const userMain = new UserMain({
// 			user : userId
// 		});

// 		userMain.save(err=>{
// 			if(err) console.log(err);				
// 		});
// 		console.log("userMain doc 생성됨");
// 	}else{
// 		console.log(userMain.name+" userMain 이미존재");
// 	}
// })
