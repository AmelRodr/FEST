const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport');

//Profile
router.get('/:username', (req, res, next)=>{
  const {username} = req.params
  User.findOne({username:username})
    .then(user=>{    
      res.render('providers/profile', user)
    }).catch(error=>{
      console.log(error)
    })
})


module.exports = router
