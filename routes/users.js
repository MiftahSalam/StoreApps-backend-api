const express = require('express');
const authorize = require('../utils/authorize')
const router = express.Router();
const service = require('../prisma/User')
const passport = service.passport

/* GET users listing. */
// router.get('/', authorize(1,2), getAll); //admin dan staff only
// router.get('/:username', authorize(1,3), getUserByUsername); //admin dan staff only

router.get('/', function(req, res, next) { console.log("users -> get /"); next()}, 
          passport.authenticate('local', { failureRedirect: '/' }),
          authorize(1), getAll)

function getUserByUsername(req, res, next) {
  console.log("Route users -> getUserByUsername -> req.user.username",req.user.username)
  console.log("Route users -> getUserByUsername -> req.params.username",req.params.username)

  if(req.user.username !== req.params.username) {
    return res.status(403).json({message: "Forbidden access"})
  }

  service.getUserByUsername(req.user.username)
  .then(user => res.json(user))
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