const router = require('express').Router()
const Provider = require('../models/Provider')
const passport = require('passport');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//signup
router.get('/signup',(req,res,next)=>{
  res.render('providers/signup')
})

router.post("/signup", (req, res, next) => {
  const {username,email,password,name,bio,category} = req.body;
  if (username === "" || password === "" || email === "") {
    res.render("providers/signup", { message: "Indicate username, password and email" });
    return;
  }

  Provider.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("providers/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newProvider = new Provider({
      email,
      username,
      name,
      password: hashPass,
      bio,
      category
    });

    newProvider.save()
    .then(() => {
      res.redirect("/providers/login");
    })
    .catch(err => {
      res.render("providers/signup", { message: "Something went wrong" });
    })
  });
});

// router.post('/signup',(req,res,next)=>{
//   Provider.register(req.body,req.body.password)
  
//   .then(r=>{
//     console.log(r)
//     res.redirect('/providers/login')
//   }).catch(e=>console.log(e))
// })
//login
router.get('/login',(req, res, next)=>{
  res.render('providers/login')
})

router.post('/login',(req, res, next) => {
  const {username} = req.body
  res.redirect(`/providers/${username}`)
})

//Profile
router.get('/:username', (req, res, next)=>{
  const {username} = req.params
  Provider.findOne({username:username})
    .then(provider=>{    
      res.render('providers/profile', provider)
    }).catch(error=>{
      console.log(error)
    })
})



//Edit Profile


module.exports = router
