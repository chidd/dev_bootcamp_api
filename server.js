const express  =  require('express');
const dotenv = require('dotenv')
const morgan = require('morgan');
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')
const colors = require('colors')
// const logger = require('./middleware/logger');

// load env vars
dotenv.config({path: './config/config.env'});

// route file
const bootcamps = require('./routes/bootcamps')


// connect to database
connectDB()

const app =  express();

// body parser
app.use(express.json())

// Dev loggin middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// app.use(logger)


// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

// error handling
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

//Handle unhandled promise rejection
process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error: ${err.message}`.red.bold)
    // close and exit process
    server.close(()=>process.exit(1))
})