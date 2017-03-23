const api_key = process.env.MAILGUNKEY;
const domain = process.env.MAILGUNDOMAIN;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
const express = require('express')
const router = express.Router()

router.post('/', (req,res) => {
  var data = {
    from: 'Fantastic Weather! <faisonusmc@gmail.com>',
    to: req.body.to,
    subject: 'Weather updates',
    text: req.body.text
  }
  mailgun.messages().send(data, function (error, body) {
    res.send(body)
  })
})

router.get('/', (req,res) => {
  res.send(200)
})

module.exports = router
