var passport = require("passport")
var Local = require("passport-local")
var users = require("./users")
passport.use(new Local(function (userEmail, password, done)
{
  users.authenticate(userEmail, password).then(verified => {
    if (!verified.response){
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
  done(null, user.userEmail)
})

passport.deserializeUser(function (userEmail, done)
{
  users.find(userEmail).then(function(user){
    done(null, user)
  })
})

module.exports = passport
