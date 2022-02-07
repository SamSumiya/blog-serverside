

const get_loginPage = (req, res) => {
  res.send('login page') 
}

const get_dashboard = (req, res) => {
  res.send('dashboard page');
};



module.exports = {
  get_loginPage,
  get_dashboard,
};