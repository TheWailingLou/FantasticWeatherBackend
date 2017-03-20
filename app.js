const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const pg = require('pg')
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cors())

app.listen(PORT, () => {
  console.log(`The Fantastic 3 + 1 is listening on PORT: ${PORT}`);
})
