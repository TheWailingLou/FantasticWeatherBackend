require('dotenv').config()

const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('./passport')
const mailgun = require('./routes/mailgun.js')
const idealWeather = require('./routes/ideal.js')
const locations = require('./routes/locations.js')
const zipcodes = require('./routes/zipcodes.js')
const verification = require('./routes/verification.js')
const cors = require('cors')
const pg = require('pg')
const PORT = process.env.PORT || 8000
const app = express()


var whitelist = ['https://fantasticweatherfrontend.firebaseapp.com', 'http://localhost:5000']

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  origin: whitelist
  // maxAge: 3600
}))



app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser())

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    // maxAge: 3600,
    sameSite: 'lax',
    httpOnly: false,
    secure: true
  }
  // rolling: true

}))



app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static('public'))

// app.use(function (req, res, next) {
//   console.log("USER Auth:");
//   console.log(req.user)
//   if (!req.isAuthenticated()) {
//     res.status(403).send();
//     return;
//   }
//   next()
// });

app.use(function(req, res, next) {
  console.log("");
  // req.session.foo = "bar";
  console.log("cookie");
  console.log(req.cookies)
  console.log("")
  console.log(req.session)
  console.log("");
  next()
})


app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message:err.message,
    error: err
  })
})

app.use('/idealWeather', idealWeather);
app.use('/locations', locations)
// app.use('/users', users)
app.use('/zipcodes', zipcodes)
app.use('/verification', verification)
app.use('/mailgun', mailgun)



app.listen(PORT, () => {
  console.log(`The Fantastic 3 + 1 is listening on PORT: ${PORT}`);
})

module.exports = app;
