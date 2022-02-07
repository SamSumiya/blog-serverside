const Blog = require('../model/Blog')


const addBlogs = (req, res) => {
  res.render('blog/add')
}

module.exports = addBlogs; 