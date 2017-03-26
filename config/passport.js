var passport=require("passport");
var User=require("../models/user");
var LocalStrategy=require("passport-local").Strategy;
var flash = require('connect-flash');


passport.use("local.signin", new LocalStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true
}, function(req, email, password, done){
	req.checkBody("email", "Invalid Email").notEmpty();
	req.checkBody("password", "Invalid password").notEmpty();
	var errors=req.validationErrors();
	if(errors){
		var messages=[];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null, false, req.flash("error", messages));
	}
	User.findOne({"email": email}, function(err, user){
		if(err){
			return done(err);
		}
		if(!user){
			return done(null, false, {message: "No user found"});
		}
		if(!user.validPassword(password)){
			return done(null, false, {message: "Wrong password"});
		}
		return done(null, user);
	});

}));







// var passport=require("passport");
// var User=require("../models/user");
// var LocalStrategy=require("passport-local").Strategy;


// passport.use("local.signin", new LocalStrategy({
// 	usernameField: "email",
// 	passwordField: "password",
// 	passReqToCallback: true
// }, function(req, email, password, done){
// 	req.checkBody("email", "Invalid Email").notEmpty();
// 	req.checkBody("password", "Invalid password").notEmpty();
// 	// var errors=req.validationErrors();
// 	// if(errors){
// 	// 	var messages=[];
// 	// 	errors.forEach(function(error){
// 	// 		messages.push(error.msg);
// 	// 	});
// 	// 	return done(null, false, req.flash("error", messages));
// 	// }
// 	User.findOne({"email": email}, function(err, user){
// 		if(err){
// 			return done(err);
// 		}
// 		if(!user){
// 			return done(null, false, {message: "No user found"});
// 		}
// 		if(!user.validPassword(password)){
// 			return done(null, false, {message: "Wrong password"});
// 		}
// 		return done(null, user);
// 	});

// }));