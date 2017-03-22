var express = require('express');
var router = express.Router();
var passport = require('../passport');
var users = require('../users')

router.get('/', function(req, res, next) {
  if (req.isAuthenticated())
  {
    console.log("user authenticated")
    res.status(200).send()
    return;
  }
  console.log("user not authenticated")
  res.status(403).send();
});

router.post('/register', function (req, res, next) {
  console.log("register sent to")
  // Add the user to our data store
  // console.log(req.body)
  // var success = false;
  users.add(req.body.email, req.body.password).then(userAdded => {
    console.log(userAdded)
    if (!userAdded[0]) {
      // console.log("user was not added")
      res.status(500).send()
      next(new Error('User could not be created.'));
      return;
    } else {
      // console.log("user was created!")

      res.status(201).send();
    }
  });
})

// This route will authenticate a user and create a session.
// If successful, req.user will exist,
// redirect to /dashboard,
// and req.isAuthenticated() will return true
router.post('/login', passport.authenticate('local'), function(req, res){
  console.log("is it authenticating?? USER:")
  console.log(req.user)
  req.logIn(req.user, function (err) { // <-- Log user in
    //  return res.redirect('/');
     res.status(200).send("You have been successful")
  });

});

router.get('/logout', function (req, res) {
  // Clear the session and unauthenticate the user
  req.logout();
  res.status(200).send();
});

router.get('/verify', function (req, res, next) {
  // Determine if the user is authorized to view the page
  console.log("is authenticated? ? ! ?")
  console.log(req.cookies)
  console.log(req.user)
  console.log("session", req.session)
  console.log(req.isAuthenticated())
  if (!req.isAuthenticated()) {
    res.status(403).send();
    return;
  }
  // req.user will be the value from deserializeUser
  res.json({user:req.user})
});

module.exports = router
