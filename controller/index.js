

const get_loginPage = (req, res) => {
  res.render('login.hbs') 
}

const get_dashboard = (req, res) => {
  res.render('dashboard.hbs');
};



module.exports = {
  get_loginPage,
  get_dashboard,
};