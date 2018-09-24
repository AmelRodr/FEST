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
    res.redirect('/auth/login')
  }).catch(e=>console.log(e))
})
//login
router.get('/login',(req, res, next)=>{
  res.render('auth/login')
})

router.post('/login',passport.authenticate('local',{
  //estos sirven para marcar el error en caso de no ingresar password o user correctos
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true

}),(req,res,next)=>{
   const {username} = req.user
   req.app.locals.user = req.user
   res.redirect(`/providers/${username}`)  //para ir a la pagina de profile del user

})


//Profile


//Edit Profile


module.exports = router