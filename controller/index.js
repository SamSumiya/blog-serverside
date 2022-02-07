const Blog = require('../model/Blog');

const get_loginPage = (req, res) => {
  res.render('login.hbs', {
    layout: 'login',
  });
};

const get_dashboard = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id }).lean();
    res.render('dashboard.hbs', {
      name: req.user.firstName,
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.render('error/500')
  }
};

module.exports = {
  get_loginPage,
  get_dashboard,
};
