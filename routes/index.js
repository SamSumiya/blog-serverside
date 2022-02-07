const express = require('express')
const router = express.Router()


const { ensureAuth, ensureGuest } = require('../middleware/auth');
const { get_loginPage, get_dashboard } = require('../controller/index');

// Login page
router.get('/login', ensureGuest, get_loginPage);
router.get('/dashboard', ensureAuth, get_dashboard);

module.exports = router