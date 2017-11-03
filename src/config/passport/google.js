
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var User = require('../../model/Users');

module.exports = function(app, passport) {
	return new GoogleStrategy({
		clientID: config.google.clientID,
		clientSecret: config.google.clientSecret,
		callbackURL: config.google.callbackURL,
		profileFields: ['id', 'displayName', 'photos', 'email']
	}, function(accessToken, refreshToken, profile, done) {
		console.log('passport의 google 호출됨.');
		console.dir(profile);
		
		var options = {
		    criteria: { 'google.id': profile.id }
		};
		
		var database = app.get('database');
	    User.findOne(options.criteria, function (err, user) {
			if (err) return done(err);
      
			if (!user) {
				var user = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					provider: 'google',
					authToken: accessToken,
					google: profile._json
				});
        
				user.save(function (err) {
					if (err) console.log(err);
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
	    });
	});
};
