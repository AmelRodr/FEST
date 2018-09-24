const router = require('express').Router()
const Provider = require('../models/Provider')



router.get('/:username', (req, res, next)=>{
  const {username} = req.params
  Provider.findOne({username:username})
  .then(provider=>{
    res.render('/profile')
  })
  .catch(e=>next(e))

//Edit Profile
router.get('/:username/edit', (req, res, next)=>{
  const {username} = req.params
  Provider.findOne({username:username})
    .then(provider=>{
      res.render('providers/edit',provider)
    }).catch(e=>next(e))
})

router.post('/:username/edit', uploadCloud.single('image'), (req, res, next)=>{
  const {username} = req.params
  if(req.file)req.body['photoURL']= req.file.url
  Provider.findByOneAndUpdate({username:username},{$set:req.body},{new:true})
    .then(provider=>{
      res.redirect('/profile')
    }).catch(e=>next(e))
})


module.exports = router