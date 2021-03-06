const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override')

const router = require('./routes/index');
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');

// load config and put all the global variables here
dotenv.config({ path: './config/config.env' });

require('./config/passport')(passport);

const PORT = process.env.PORT || 5050;

const connctDB = require('./db/connectDB');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Method Override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// # Hanlerbars helper
const {
  formatDate,
  truncate,
  stripTags,
  editIcon,
  select,
} = require('./helpers/hbs');

// Hanlerbars
app.engine(
  '.hbs',
  exphbs.engine({
    helpers: {
      formatDate,
      truncate,
      stripTags,
      editIcon,
      select,
    },
    defaultLayout: 'main.hbs',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

// Sessions
app.use(
  session({
    secret: 'crazy cats!',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Set global variable 
app.use(function (req, res, next) {
  res.locals.user = req.user || null 
  next() 
}) 

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/', router);
app.use('/auth', authRouter);
app.use('/api/v1/blogs', blogRouter);

process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : null;

async function start() {
  try {
    const conn = await connctDB(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    await app.listen(PORT, () => {
      console.log(
        `Server is listening in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
}

start();
