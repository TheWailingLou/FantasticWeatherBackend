const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Location() {
  return knex('location');
}

// http GET localhost:8000/locations
$.get('/', (req,res) => {
  Location().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/locations/:id
$.get('/:id', (req,res) => {
  Location().select().where('id',req.params.id)
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

module.exports = router
