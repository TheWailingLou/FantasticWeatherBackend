const bcrypt = require("bcrypt")
const knex = require('./db/knex')

// var users = []
var id = 0

function hashPassword (password)
{
  return bcrypt.hashSync(password, 10)
}
// console.log(hashPassword("blah"))

function findUser (useremail)
{
  return knex('username').where('email', useremail)
}

function authenticateUser (useremail, password)
{
  return findUser(useremail).then(user => {
    let response;
    if (!user[0])
    {
      response = false
    } else {
      // console.log(user[0].password)
      response = bcrypt.compareSync(password, user[0].password);
      console.log(response)
    }

    return response
  })
}

function addUser (newUserEmail, password)
{
  let response;
  if (!newUserEmail || !password)
  {
    // console.log("a field wasn't filled in")
    return {
      response: false
    }
  } else {
    return findUser(newUserEmail).then(userExists => {
      if (userExists[0]) {
        return false
      } else {
        var user = {
          email: newUserEmail,
          password: hashPassword(password)
        }
        return knex('username').insert(user, 'password')
      }

    })
  }

}

module.exports = {
  find: findUser,
  authenticate: authenticateUser,
  add: addUser
}
