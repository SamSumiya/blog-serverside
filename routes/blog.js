const express = require('express');
const router = express.Router();

const { ensureAuth } = require('../middleware/auth');
const {
  getBlogs,
  addBlog,
  getAllBlogs,
  getEditPage,
  editBlog,
} = require('../controller/blog');

// #Desc Get /blogs/add
router.get('/add', ensureAuth, getBlogs);
// #Desc Post
router.post('/', ensureAuth, addBlog);

router.get('/', ensureAuth, getAllBlogs);

router.get('/edit/:id', ensureAuth, getEditPage);

router.put('/:id', ensureAuth, editBlog);

module.exports = router;
