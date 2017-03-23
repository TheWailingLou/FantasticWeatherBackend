var passport = require("passport")
var Local = require("passport-local")
var users = require("./users")
passport.use(new Local({"usernameField": "email"}, function (userEmail, password, done)
{
  // console.log("loggin here.")
  // console.log(userEmail, password)
  users.authenticate(userEmail, password).then(verified => {

    // console.log('verified?')
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
  // console.log("serializeUser called")
  // console.log(user)
  done(null, user[0].email)
})

passport.deserializeUser(function (user, done) {
  console.log("")
  console.log("deserialize user called")
  console.log("")
  users.find(user).then(function(blah){
    done(null, blah)
  }).catch()
})


module.exports = passport
