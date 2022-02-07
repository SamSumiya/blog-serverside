

const get_loginPage = (req, res) => {
  res.render('login.hbs', {
    layout: 'login'
  }) 
}

const get_dashboard = (req, res) => {
  console.log(req.user);
  res.render('dashboard.hbs');
};



module.exports = {
  get_loginPage,
  get_dashboard,
};