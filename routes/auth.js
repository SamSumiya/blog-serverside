const express = require('express');
const router = express.Router();
const passport = require('passport');

const { redirect_google } = require('../controller/auth');

// @Desc Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
  })
);

// @Desc Google Auth Callback
router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/',
  }), (req, res) => {
    res.redirect('/dashboard')
  }
);

module.exports = router;
