const Blog = require('../model/Blog')


const getBlogs = (req, res) => {
  res.render('blog/add');
};

const addBlog = async (req, res) => {
  try {
    req.body.user = req.user.id
    console.log(req.body, 'this dsfasdfasfasfasdfasdfasfasdf');
    await Blog.create(req.body);
    res.redirect('/api/v1/dashboard')
  } catch (error) {
    console.error(error);
    res.render('error/500')
  }
}

module.exports = {
  getBlogs,
  addBlog,
}; 