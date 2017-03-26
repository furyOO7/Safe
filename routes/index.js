var express = require('express');
var router = express.Router();
var passport=require("passport");
var User= require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.get('/profile',function(req, res, next){
	res.render('profile')
})
router.get('/logout', function(req, res, next) {
  res.redirect('/');
})

router.post('/signup',function(req, res, next){
	User.findOne({email:req.body.email},function(err, result){
		if(result)
		{
			res.status(400).send({status:400, message:'Email Already Exist!!'})
			return
		}
		var newUser = new User();
		newUser.email=req.body.email;
		newUser.password=req.body.password;
		newUser.save(function(err,result){
			res.send({});
		})
	})
})
router.post('/', function(req,res,next){
	User.findOne({email: req.body.email}, function(err, result){
		if(!result){
			res.status(400).send({status: 400, message: 'Email  not found'})
			return
		}
		if(result.password===req.body.password){
			res.send({})
		}
			else
			{
				res.status(400).send({status: 400, message: 'Wrong password'})
			}

	})
})
module.exports = router;
