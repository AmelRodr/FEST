const passport = require('passport');
const Provider = require('../models/Provider');


passport.use(Provider.createStrategy());

passport.serializeUser((user, cb) => {
  cb(null, user)
});

passport.deserializeUser((user, cb) => {
  cb(null, user)
});

module.exports = passport;