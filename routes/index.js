var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require('../models/user');
var Userdata = require('../models/userdata');
/* GET home page. */
router.get('/', notLoggedIn, function(req, res, next) {
    res.render('index')
});

router.get('/signup', notLoggedIn, function(req, res, next) {
    res.render('signup');
});
router.get('/profile', isLoggedIn, function(req, res, next) {
    Userdata.find({ userId: req.session.userId }, function(err, result) {
        res.render('profile', { userdata: result })
    })


})

router.delete('/delete', function(req, res, data) {
    Userdata.remove({ _id: req.body.id }, function(err) {
        res.send({});

    });
})
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        res.redirect('/');
    })

})
router.post('/save', function(req, res, next) {
    var newUserdata = new Userdata();
    newUserdata.siteName = req.body.siteName;
    newUserdata.siteUrl = req.body.siteUrl;
    newUserdata.sitePassword = req.body.sitePassword;
    newUserdata.userId = req.session.userId;
    newUserdata.save(function(err, result) {
        res.send(newUserdata);
    })


})
router.post('/signup', function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, result) {
        if (result) {
            res.status(400).send({ status: 400, message: 'Email Already Exist!!' })
            return
        }
        var newUser = new User();
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.save(function(err, result) {
            res.send({});
        })
    })
})
router.post('/', function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, result) {
        if (!result) {
            res.status(400).send({ status: 400, message: 'Email  not found' })
            return
        }
        if (result.password === req.body.password) {
            req.session.userId = result._id;
            res.send({})
        } else {
            res.status(400).send({ status: 400, message: 'Wrong password' })
        }

    })
})
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect("/");
}

function notLoggedIn(req, res, next) {
    if (!req.session.userId) {
        return next();
    }
    res.redirect("/profile");
}
