const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Ideal() {
  return knex('ideal')
}

// http GET localhost:8000/ideal
router.get('/', (req,res) => {
  Ideal().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/:id
router.get('/:username_id/:location_id', (req,res) => {
  Ideal().select().where('username_id',req.params.username_id).andWhere('location_id',req.params.location_id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http POST localhost:8000/idealWeather username_id=# location_id=# temp_max=## temp_min=## wind_max=# percip_max=#
router.post('/', (req,res) => {
  Ideal().insert({
    username_id: req.body.username_id,
    location_id: req.body.location_id,
    temp_max: req.body.temp_max,
    temp_min: req.body.temp_min,
    wind_max: req.body.wind_max,
    percip_max: req.body.percip_max
  },['username_id','location_id','temp_max','temp_min','wind_max','percip_max'])
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

module.exports = router
