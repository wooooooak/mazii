
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
		
		var options = {
		    criteria: { 'facebook.id': profile.id }
		};
		
	    User.findOne(options.criteria).populate('Alarms').exec(function (err, user) {
			if (err) return done(err);
			if (!user) {
				let email ;
				if(!profile.emails){
					email = profile._id; //이메일 아이디가 없으면 id를 email로 만듬
				}else{
					email = profile.emails[0].value
				}
				// console.dir(profile);
				console.log("email 확인 --------------- ");
				console.log(email);
				var user = new User({
					name: profile.displayName,
					email: email,
					provider: 'facebook',
					authToken: accessToken,
					facebook: profile._json
				});				

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