const router = require('express').Router()
const User = require('../models/User')
const uploadCloud = require('../helpers/cloudinary')

router.get('/:username',(req,res,next) =>{
  const {username} = req.params
  User.findOne({username:username})
  .then (user => {
    //let isOwner = false
   // if (req.user._id == user._id) isOwner = true
    res.render('users/profile',{data:user/*,owner:isOwner*/})
  }).catch(e=>{
    res.redirect('/')
  })  
})

//edit 

router.get('/:username/edit',(req,res,next)=>{
  //const {username} = req.params
  User.findById(req.user._id) 
  .then(user=>{
    res.render('users/edit',user)
  }).catch(e=>next(e))
})

router.post('/:username/edit',uploadCloud.single('image'),(req,res,next)=>{
  const {username} = req.params
  if(req.file) req.body['photoURL'] = req.file.url
  User.findOneAndUpdate({username:username},{$set:req.body},{new:true})
  .then(user=>{
    res.redirect(`/users/${user.username}`)
  }).catch(e=>{
    console.log(e)
  })
})



module.exports = router 