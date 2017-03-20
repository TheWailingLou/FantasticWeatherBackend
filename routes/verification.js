var express = require('express');
var router = express.Router();
var passport = require('../passport');
var users = require('../users')

router.get('/', function(req, res, next) {
  if (req.isAuthenticated())
  {
    console.log("user authenticated")
    res.redirect('/dashboard');
    return;
  }
  console.log("user not authenticated")
  res.send();
});

router.post('/register', function (req, res, next) {
  // Add the user to our data store
  // console.log(req.body)
  // var success = false;
  users.add(req.body.email, req.body.password).then(userAdded => {
    console.log(userAdded)
    if (!userAdded[0]) {
      console.log("user was not added")
      next(new Error('User could not be created.'));
      return;
    } else {
      console.log("user was created!")
      res.redirect('/');
    }
  });
})

// This route will authenticate a user and create a session.
// If successful, req.user will exist,
// redirect to /dashboard,
// and req.isAuthenticated() will return true
router.post('/login', passport.authenticate('local', {
    successRedirect: '/userHome',
    failureRedirect: '/'
  })
);

router.get('/logout', function (req, res) {
  // Clear the session and unauthenticate the user
  req.logout();
  res.redirect('/');
});

router.get('/userHome', function (req, res, next) {
  // Determine if the user is authorized to view the page
  if (!req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  // req.user will be the value from deserializeUser
  res.json({user:req.user})
});

module.exports = router
