const router = require('express').Router()
const User = require('../models/User')
//const uploadCloud = require('../helpers/cloudinary')

router.get('/:username',(req,res,next) =>{
  const {username} = req.params
  User.findOne({username:username})
  .then (user => {
    res.render('users/profile',{data:user})
  }).catch(e=>{
    res.redirect('/')
  })  
})

//edit 

module.exports = router 