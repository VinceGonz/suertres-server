const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet'); 
const cors = require('cors'); 
const db = require('./config/database');
require('dotenv').config();
const sequelize = require('./db/database')

const { notFound, errorHandler } = require('./middlewares');


// * Instantiate a express server
const app = express();


// * Setup built in express body-parser
// ! NOTE: Always setup the body-parser on top of the routes.
app.use(express.json());

// ignore options request
// app.options('*', (req, res, next) => res.sendStatus(200));

app.use(morgan('dev')); // ? Can use 'dev' / 'common' as parameter

app.use(helmet());

// * Setup Cors Middleware (Cross-Origin Resource Sharing)
app.use(cors('*'));
  

// * Auth and API routes
app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

app.get('/', (req, res) => {
  res.json({ Message: 'SUCCESS' });
});


// * Not found handler middleware
app.use(notFound);

// *handler middleware
app.use(errorHandler);


const port = process.env.PORT || 5000; // during deployment change to 8080

app.listen(port, async () => {

  try {
    await db.authenticate();
    
    console.log('Connection has been established successfully.');
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

});
