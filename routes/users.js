const express = require('express');
const authorize = require('../utils/authorize')
const router = express.Router();
const service = require('../prisma/User')
const passport = service.passport

router.get('/logout', function(req, res) {
  console.log("users -> get /users/logout -> user",req.user);
  req.logOut()
  res.clearCookie('username')
  res.status(200).json({message: "OK", redirect: '/users/login'})
}
)

router.post('/login', function(req, res, next) {
  console.log("users -> post /users/login",req.session);
  next()
},
passport.authenticate('local', { failureRedirect: '/users/invalid' }),
authenticated
)


router.get('/', function(req, res, next) { 
  console.log("users -> get /users/ "); 
  next()
}, 
passport.authenticate('local', { failureRedirect: '/users/invalid' }),
authorize({roles: 1}), getAll
)

router.get('/user/:username', function(req, res, next) { 
  console.log("users -> get /users/user/:username/"); 
  next()
},
passport.authenticate('local', { failureRedirect: '/users/invalid' }),
authorize({roles: [1,2,3]}),
getUserByUsername
)

router.get('/invalid', function(req, res, next) { 
  console.log("users -> invalid") 
  res.status(401).json({message: "Invalid username and password"})
})

function authenticated(req, res) {
  console.log("Route users -> authenticated -> req.user",req.user.username)
  res.cookie('username', req.user.username, {
    maxAge: 60*1000
  })
  res.status(200).json({message: "OK", user: req.user, redirect: req.originalUrl})
}

function getUserByUsername(req, res, next) {
  console.log("Route users -> getUserByUsername -> req.user.username",req.user.username)
  console.log("Route users -> getUserByUsername -> req.params.username",req.params.username)

  if(req.user.roleId !== 1) {
    if(req.user.username !== req.params.username)
      return res.status(403).json({message: "Forbidden access"})
  }
  
  service.getUserByUsername(req.params.username)
  .then(user => {
    const {id, password, ...userWithoutPassword} = user
    // console.log("Route users -> getUserByUsername -> userWithoutPassword",userWithoutPassword)
    res.json(userWithoutPassword)
  })
  .catch(err => next(err))
}

function getAll(req, res, next){
  // console.log("Route users -> getAll -> respons",res)
  service.getAllUser()
  .then(users => res.json(users))
  .catch(err => next(err))
}

module.exports = {
  router,
  passport,
}