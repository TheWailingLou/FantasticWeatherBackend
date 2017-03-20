const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Location() { return knex('location') }
function Zipcode() { return knex('zipcode') }


// http GET localhost:8000/locations
router.get('/', (req,res) => {
  Location().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/locations/:id
router.get('/:id', (req,res) => {
  Location().select().where('id',req.params.id)
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http POST localhost:8000/locations name='' longitude=# latitude=# zipcode_id=#####
router.post('/', (req,res) => {
  Zipcode().where('id',req.body.zipcode_id).select()
  .then( result => {
    if(result.length === 0) {
      return Zipcode().insert({id: req.body.zipcode_id},'id')
      .then( () => {
        return req.body.zipcode_id
      })
    }
    else {
      return result[0].id
    }
  })
  .then( (result) => {
    Location().insert({
      name: req.body.name,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      zipcode_id: result
    },['name','longitude','latitude','zipcode_id'])
    .then( result => {
      res.json(result)
    })
  })
})

module.exports = router
