

const get_loginPage = (req, res) => {
  res.render('login.hbs', {layout: false}) 
}

const get_dashboard = (req, res) => {
  res.render('dashboard.hbs', { layout: false });
};



module.exports = {
  get_loginPage,
  get_dashboard,
};