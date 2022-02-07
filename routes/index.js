const express = require('express')
const router = express.Router()

const { get_loginPage, get_dashboard } = require('../controller/index');

// Login page
router.route('/login').get(get_loginPage)
router.route('/dashboard').get(get_dashboard); 

module.exports = router