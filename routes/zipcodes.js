const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Zipcode() {
  return knex('zipcode')
}

// http GET localhost:8000/users
router.get('/', (req,res) => {
  Zipcode().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/:id
router.get('/:id', (req,res) => {
  Zipcode().select().where('id',req.params.id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

module.exports = router
