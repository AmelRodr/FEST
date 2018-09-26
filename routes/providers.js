const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport');
const uploadCloud = require('../helpers/cloudinary')

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


router.get('/:username/edit',(req,res,next)=>{
  const {username} = req.params
  console.log(req.user._id)
  User.findById(req.user._id) 
  .then(user=>{
    res.render('providers/edit',user)
  }).catch(e=>next(e))
})/*

router.post('/:username/edit',uploadCloud.single('image'),(req,res,next)=>{
  const {username} = req.params
  if(req.file) req.body['photoURL'] = req.file.url
  User.findOneAndUpdate({username:username},{$set:req.body},{new:true})
  .then(user=>{
    res.redirect(`/providers/${username}`)
  }).catch(e=>{
    console.log(e)
  })
})                    
*/


module.exports = router
