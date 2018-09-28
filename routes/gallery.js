const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport');
const uploadCloud = require('../helpers/cloudinary')

// gallery
router.get('/:username/gallery',(req,res,next)=>{
  User.findOne({username:req.params.username}) 
  .then(user=>{
    console.log(user)
    if(user._id==req.user._id)user['is_owner'] = true
    res.render('providers/gallery',user)
  }).catch(e=>next(e))
})

// edit gallery

router.get('/:username/edit/gallery',(req,res,next)=>{
 
  console.log(req.user._id)
  User.findById(req.user._id) 
  .then(user=>{
    res.render('providers/editgallery',user)
  }).catch(e=>next(e))
})

router.post('/:username/edit/gallery',uploadCloud.array('images'),(req,res,next)=>{
  
  const {username} = req.params
 
  if(req.files){
    let images = []
    for(let image of req.files ){
      images.push(image.url)
    }
    req.body['gallery'] = images
  }
  User.findOneAndUpdate({username:username},{$push:req.body},{new:true})
  .then(user=>{
    res.redirect(`/providers/${username}/gallery`)
  }).catch(e=>{
    console.log(e)
  })
})      


module.exports = router
