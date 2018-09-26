const router = require('express').Router()
const User = require('../models/User')
const uploadCloud = require('../helpers/cloudinary')

//Profile
router.get('/:username', (req, res, next)=>{
  const {username} = req.params
  User.findOne({username:username})
    .then(user=>{    
      res.render('users/profile', user)
    }).catch(error=>{
      console.log(error)
    })
})

module.exports = router 