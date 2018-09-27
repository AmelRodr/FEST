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

///EDIT

router.get('/:username/edit',(req,res,next)=>{
 
  console.log(req.user._id)
  User.findById(req.user._id) 
  .then(user=>{
    res.render('providers/edit',user)
  }).catch(e=>next(e))
})

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

///LIST
console.log('hola')
router.get('/uno/list',(req,res,next)=>{
 // console.log('dentro de list')
  User.find({role:'Empresa'})
  .then(users=>{
    //console.log( 'AQUI*********')
  
    res.render('users/list',{users})
  }).catch(e=>{
    res.redirect('/:username')
  })
})


///COMMENTS

router.post('/:username/comments',(req, res, next)=>{
  const {id} = req.params
  req.body['user'] = req.user._id
  Comment.create(req.body)
    .then(comment=>{
      res.redirect(`/posts/detail/${id}`)
    }).catch(e=>{
      console.log(e)
    })
})




module.exports = router
