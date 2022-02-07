const Blog = require('../model/Blog');

const getBlogs = (req, res) => {
  res.render('blog/add');
};

const addBlog = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Blog.create(req.body);
    res.redirect('/api/v1/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('blog/index', {
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
};

module.exports = {
  getBlogs,
  addBlog,
  getAllBlogs,
};
