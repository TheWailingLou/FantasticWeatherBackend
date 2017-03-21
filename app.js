require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const pg = require('pg')
const path = require('path');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const passport = require('./passport')
const PORT = process.env.PORT || 8000
const idealWeather = require('./routes/ideal.js');
const locations = require('./routes/locations.js');
// const users = require('./routes/users.js');
const zipcodes = require('./routes/zipcodes.js')
const verification = require('./routes/verification.js')

app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
// app.use(cors())
app.use('/idealWeather', idealWeather);
app.use('/locations', locations)
// app.use('/users', users)
app.use('/zipcodes', zipcodes)
app.use('/verification', verification)

app.listen(PORT, () => {
  console.log(`The Fantastic 3 + 1 is listening on PORT: ${PORT}`);
})

module.exports = app;
