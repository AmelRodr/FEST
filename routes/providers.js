const router = require('express').Router()
const Provider = require('../models/Provider')
const passport = require('passport');

//signup
router.get('/signup',(req,res,next)=>{
  res.render('providers/signup')
})

router.post('/signup',(req,res,next)=>{
  Provider.register(req.body,req.body.password)
  .then(r=>{
    console.log(r)
    res.redirect('/providers/login')
  }).catch(e=>console.log(e))
})
//login
router.get('/login',(req, res, next)=>{
  res.render('providers/login')
})

router.post('/login',passport.authenticate('local'), (req, res, next) => {
  const {username} = req.user
  res.redirect(`/providers/${username}`)
})

//Profile
router.get('/:username', (req, res, next)=>{
  const {username} = req.params
  Provider.findOne({username:username})
    .then(provider=>{    
      res.render('providers/profile',provider)
    }).catch(error=>{
      console.log(error)
    })
})



//Edit Profile


module.exports = router
