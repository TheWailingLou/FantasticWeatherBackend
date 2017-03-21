const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Ideal() {
  return knex('ideal')
}

//********************* READ *********************//

// http GET localhost:8000/idealWeather
router.get('/', (req,res) => {
  Ideal().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/idealWeather/:id
router.get('/:username_id/:location_id', (req,res) => {
  Ideal().select().where('username_id',req.params.username_id).andWhere('location_id',req.params.location_id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

//********************* CREATE *********************//

// http POST localhost:8000/idealWeather username_id=# location_id=# temp_max=## temp_min=## wind_max=# percip_max=#
router.post('/', (req,res) => {
  Ideal().where('username_id',req.body.username_id).andWhere('location_id',req.body.location_id).select()
  .then( result => {
    if(result.length === 0) {
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
        res.status(500).send('The system has recognized that this ins a new idealWeather combination, however, there was an internal error when trying to post the new idealWeather combination.')
      })
    }
    else {
        res.status(404).send('This combination already exists!')
    }
  })
  .catch( result => {
    res.status(500).send('There was an internal error when trying to post an idealWeather combination.')
  })
})

//********************* UPDATE *********************//

// http PUT localhost:8000/idealWeather/:username_id/:location_id temp_max=# temp_min=# wind_max=# percip_max=#
router.put('/:username_id/:location_id', (req,res) => {
  Ideal().where('username_id',req.params.username_id).andWhere('location_id',req.params.location_id).update({
    temp_max: req.body.temp_max,
    temp_min: req.body.temp_min,
    wind_max: req.body.wind_max,
    percip_max: req.body.percip_max
  }, ['username_id','location_id','temp_max','temp_min','wind_max','percip_max'])
  .then( result => {
    res.json(result)
  })
})

//********************* DELETE *********************//

// http DELETE localhost:8000/idealWeather/:username_id/:location_id
router.delete('/:username_id/:location_id', (req,res) => {
  Ideal().where('username_id',req.params.username_id).andWhere('location_id',req.params.location_id).del()
  .then( result => {
    res.json(result)
  })
})
module.exports = router
