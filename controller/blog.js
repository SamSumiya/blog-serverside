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

const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user').lean();

    if (!blog) {
      return res.render('error/404');
    }

    res.render('blog/show', {
      blog,
    });
  } catch (error) {
    res.render('error/404');
  }
};

const getEditPage = async (req, res) => {
  console.log(req.params);

  const blog = await Blog.findOne({
    _id: req.params.id,
  }).lean();
  if (!blog) {
    console.error(error);
    return res.render('error/404');
  }

  if (blog.user.toString() !== req.user.id) {
    res.redirect('/blogs');
  } else {
    res.render('blog/edit', {
      blog,
    });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .lean();
    res.render('blog/index', {
      blogs
    })
  } catch (error) {
    res.render('error/500')
  }
};

const editBlog = async (req, res) => {
  let blog = await Blog.findById(req.params.id).lean();

  if (!blog) {
    return res.render('error/404');
  }
  if (blog.user.toString() !== req.user.id) {
    res.redirect('/blogs');
  } else {
    try {
      blog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect('/api/v1/dashboard');
    } catch (error) {
      console.error(error);
      return res.render('error/404');
    }
  }
};

const deleteBlog = async (req, res) => {
  try {
    const msg = await Blog.findOneAndDelete({ _id: req.params.id });
    res.redirect('/api/v1/dashboard');
  } catch (error) {
    console.error(error);
    return res.render('error/500');
  }
};

module.exports = {
  getBlogs,
  addBlog,
  getAllBlogs,
  getSingleBlog,
  getEditPage,
  editBlog,
  deleteBlog,
  getUserBlogs,
};
