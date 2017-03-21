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
  findUser(useremail).then(user => {
    let response;
    if (!user)
    {
      response = false
    } else {
      response = bcrypt.compareSync(password, user.password);
    }
    return Promise.all({
      response: response
    })
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
        // console.log("does it make it to here?", userExists)
        return false
      } else {
        // console.log("what about here??");
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
