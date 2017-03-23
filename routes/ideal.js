const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Ideal() {
  return knex('ideal')
}

//********************* READ *********************//

router.use(function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403).send();
    return;
  }
  next()
});

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

router.get('/user', (req,res) => {
  knex('username')
    .join('ideal', 'username_id', 'username.id')
    .join('location', 'location_id', 'location.id')
    .where('username.email', req.user[0].email)
    .select('ideal.temp_min as temp_min', 'ideal.temp_max as temp_max', 'ideal.wind_max as wind_max', 'ideal.percip_max as percip_max')
  .then( result => {
    res.json(result).send()
  })
  .catch( result => {
    res.status(500).send()
  })
})

// http GET localhost:8000/idealWeather/:id
router.get('/user/:location_id', (req,res) => {
  knex('username')
    .join('ideal', 'username_id', 'username.id')
    .join('location', 'location_id', 'location.id')
    .where('username.email', req.user[0].email)
    .andWhere('location.id', req.params.location_id)
    .select('ideal.temp_min as temp_min', 'ideal.temp_max as temp_max',
      'ideal.wind_max as wind_max', 'ideal.percip_max as percip_max', 'location.name as name')
  .then ( result => {
    res.json(result).send()
  })
  .catch( result => {
    res.status(500).send()
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
router.put('/user/:location_id', (req,res) => {
  knex('username')
    .where('email', req.user[0].email).select('id')
    .then(userId => {
      var tempMin = req.body.temp_min
      var tempMax = req.body.temp_max
      var windMax = req.body.wind_max
      var percipMax = req.body.percip_max

      if (tempMin === "null") {
        tempMin = null
      }
      if (tempMax === "null") {
        tempMax = null
      }
      if (windMax === "null") {
        windMax = null
      }
      if (percipMax === "null") {
        percipMax = null
      }
      console.log(userId, req.params.location_id)
      console.log(typeof tempMin, tempMin, tempMax, windMax, percipMax)
      knex('ideal')
        .where('username_id', userId[0].id)
        .andWhere('location_id', parseInt(req.params.location_id))
        .update({
          temp_max: tempMax,
          temp_min: tempMin,
          wind_max: windMax,
          percip_max: percipMax
        })
        .then(() => {
          res.status(200).send('Table successfully updated.')
        })
        .catch(err => {
          console.log(err, "\n error updating table")
          res.status(500).send('error updating table')
        })
    })
    .catch(err => {
      console.log(err, "\n error finding user id")
      res.status(500).send("error finding user id")
    })

})

//********************* DELETE *********************//

// http DELETE localhost:8000/idealWeather/:username_id/:location_id
router.delete('/user/:location_id', (req,res) => {
  knex('username')
    .where('username.email', req.user[0].email)
    .then(userId => {
      knex('ideal')
        .where('username_id', userId[0].id)
        .andWhere('location_id', parseInt(req.params.location_id)).del()
        .then( () => {
          res.status(200).send("location preferences deleted")
        })
        .catch(err => {
          console.log(err, "\nerror deleting 'ideal' table row")
          res.status(500).send("error deleting ideal row")
        })
    })
    .catch(err => {
      console.log(err, "\nerror deleting finding user id")
      res.status(500).send("error finding user id")
    })
})

module.exports = router
