const express = require("express");
const passport = require('../helpers/passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//LOGIN

router.get('/login',(req, res, next)=>{
  res.render('auth/login')
})

router.post('/login',passport.authenticate('local'),(req, res, next) => {
  req.app.locals.loggedUser = req.user
  console.log(req.app.locals.loggedUser)
  const {username} = req.body
  if(req.user.role === 'Cliente'){
    res.redirect(`/providers/uno/list`)
  }else{

    res.redirect(`/providers/${username}`)
  }
})

router.get('/logout',(req, res, next)=>{
  req.logOut()
  req.app.locals.user = null
  res.redirect('/auth/login')
})


///SIGN UP
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const {username} = req.body;
  const {password} = req.body;
  const {email} = req.body;
  const {role} = req.body;
  if (username === "" || password === "" || email === "" || role === "") {
    res.render("auth/signup", { message: "Indicate account, username, password and email" });
    return;
  }

  User.register(req.body, password)
    .then(r=>{
      res.redirect('/auth/login')
    })

});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
