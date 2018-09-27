const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport');
const uploadCloud = require('../helpers/cloudinary')
const Comment = require('../models/Comment')

//Profile
router.get('/:username', (req, res, next)=>{
  let {user} = req.user._id
  let {username} = req.params
  User.findOne({username:username})
    .then(user=>{  
      Comment.find({provider: user._id}).populate('user')
        .then(comments=>{
          let isOwner=false
          if(req.user.username==user.username)isOwner=true
          //console.log( 'esto', comments[comments.length -1].user)

          res.render('providers/profile',{user, owner: isOwner,comments:comments})
        .catch(e=>next(e))
    }).catch(error=>{
      console.log(error)
    }) 
  })
})

///EDI

router.get('/:username/edit',(req,res,next)=>{
  let {username} = req.params
  console.log(req.user._id)
  User.findById(req.user._id) 
  .then(user=>{
    res.render('providers/edit',user)
  }).catch(e=>next(e))
})

router.post('/:username/edit',uploadCloud.single('image'),(req,res,next)=>{
  let {username} = req.params
  if(req.file) req.body['photoURL'] = req.file.url
  User.findOneAndUpdate({username:username},{$set:req.body},{new:true})
  .then(user=>{
    res.redirect(`/providers/${username}`)
  }).catch(e=>next(e))
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

router.post('/:username/comments',(req, res, next) => {
  let author = req.app.locals.loggedUser._id
  console.log(req.user)
  let {username} = req.params 
  User.findOne({username})
  .then(user => {
    Comment.create({...req.body, user: author, provider: user._id})
    .then(comment => {
      User.findByIdAndUpdate(user._id, {$push: {comments: comment._id}}, {new: true})
      .then(result => {
        res.redirect(`/providers/${username}`)
      })
    })
  })
})


module.exports = router
