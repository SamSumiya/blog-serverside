const express = require('express');
const router = express.Router();

const { ensureAuth } = require('../middleware/auth');
const { getBlogs, addBlog } = require('../controller/blog');

// #Desc Get /blogs/add
router.get('/add', ensureAuth, getBlogs);
// #Desc Post
router.post('/', ensureAuth, addBlog);

module.exports = router;
