const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Zipcode() {
  return knex('zipcode')
}

//********************* READ *********************//

router.use(function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403).send();
    return;
  }
  next()
});

// http GET localhost:8000/zipcodes
router.get('/', (req,res) => {
  Zipcode().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/zipcodes/:id
router.get('/:id', (req,res) => {
  Zipcode().select().where('id',req.params.id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

//********************* CREATE *********************//

// http POST localhost:8000/zipcodes id=#####
// THIS ROUTE SHOULD NOT BE NEEDED SINCE ZIP CODES ARE CREATED WHEN A NEW LOCATION IS ADDED
router.post('/', (req,res) => {
  Zipcode().insert({
    id: req.body.id
  },'id')
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

//********************* DELETE *********************//

// http DELETE localhost:8000/zipcodes/:id
router.delete('/:id', (req,res) => {
  Zipcode().where('id',req.params.id).del()
  .then( result => {
    res.json(result)
  })
})

module.exports = router
