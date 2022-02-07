const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// load config and put all the global variables here
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5050;

const connctDB = require('./db/connectDB');

const app = express();

app.use(morgan('dev'));



async function start() {
  try {
    const conn = await connctDB(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(PORT, () => {
      console.log(
        `Server is listening in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error) {}
}


start() 