const express = require('express');
const morgan = require('morgan'); // ? Logging the status of each request sent
const helmet = require('helmet'); // ? For more security on the headers
const cors = require('cors'); // ? To allow specific IP Addresses to have a access to the API
const db = require('./config/database');
require('dotenv').config();

const { notFound, errorHandler } = require('./middlewares');

// * Import Routes
const betsRoute = require('./routes/betsRoute')
// const authRoute = require('./routes/authRoute');
// const usersRoute = require('./routes/usersRoute');
// const transactionRoute = require('./routes/transactionsRoute');
// const donationsRoute = require('./routes/donationsRoute');
// const expensesRoute = require('./routes/expensesRoute')

// * Instantiate a express server
const app = express();


// * Setup built in express body-parser
// ! NOTE: Always setup the body-parser on top of the routes.
app.use(express.json());

// * Setup Morgan Middleware
app.use(morgan('dev')); // ? Can use 'dev' / 'common' as parameter

// * Setup Helmet Middleware (To have more secure headers)
app.use(helmet());

// * Setup Cors Middleware (Cross-Origin Resource Sharing)
app.use(cors('*'));
  

// * Setup Routes
app.use('/api/betsRoute', betsRoute);
// app.use('/api/auth', authRoute);
// app.use('/api/users', usersRoute);
// app.use('/api/transactions', transactionRoute);
// app.use('/api/donations', donationsRoute);
// app.use('/api/expenses', expensesRoute);


app.get('/', (req, res) => {
  res.json({ Message: 'SUCCESS' });
});


// * Setup not found handler middleware
app.use(notFound);

// * Setup Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5000; // during deployment change to 8080

app.listen(port, async () => {
  try{
    const connection = await db.connect();
    console.log('Successfully Connected to the Database', connection);
    console.log(`Server is running on port ${port}`);
  }catch(err){
    console.log(err)
    console.log('ERROR');
  }
  
});
