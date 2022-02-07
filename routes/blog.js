const express = require('express') 
const router = express.Router()

const { ensureAuth } = require('../middleware/auth')
const addBlogs = require('../controller/blog')


// #Desc Get /blogs/add 

router.get('/add', ensureAuth, addBlogs);



module.exports = router