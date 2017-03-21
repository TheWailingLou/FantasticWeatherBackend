var passport = require("passport")
var Local = require("passport-local")
var users = require("./users")
passport.use(new Local({"usernameField": "email"}, function (userEmail, password, done)
{
  // console.log("is it logging here?????")
  users.authenticate(userEmail, password).then(verified => {
    // console.log(verified)
    if (!verified){
      done(null, false)
    } else {
      users.find(userEmail).then(user => {
        done(null, user)
      })
    }
  })
}))

passport.serializeUser(function (user, done)
{
  // console.log("thing")
  // console.log(user)
  done(null, user)
})

passport.deserializeUser(function (userEmail, done)
{
  users.find(userEmail).then(function(user){
    done(null, user)
  })
})

module.exports = passport
