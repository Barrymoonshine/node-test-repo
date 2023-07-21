import express from 'express';
import morgan from 'morgan';
// import { URL } from 'url';
import mongoose from 'mongoose';
import mongoAtlasPw from './config.js';

// Fix for error __dirname is not defined as not available by default in ES module
// Only needed with .sendFile method
// const __dirname = new URL('.', import.meta.url).pathname;

// Set up an Express app
const app = express();

// Connect to mongoDB
const dbURI = `mongodb+srv://barrymoonshine:${mongoAtlasPw}@cluster0.wym9xjg.mongodb.net/?retryWrites=true&w=majority`;

// Async method
mongoose
  .connect(dbURI)
  // Only listen for requests after connecting to database
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Register view engine (EJS), app.set allows configuration of settings
// Default looks in the views dir
app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

// Middleware, next to run remaining code after middleware
app.use((req, res, next) => {
  console.log('new request made');
  console.log('host', req.hostname);
  console.log('path', req.path);
  console.log('method', req.method);
  next();
});

// Two arguments, what path to listen to and req and res objects call back function
app.get('/', (req, res) => {
  // Express method, no need to set header and infers status code (200)
  // .sendFile looks for absolute path, second argument (object) states the relative root
  // When using views, use the render method and file name minus the extension
  // Render method second parameter is a data object
  const blogs = [
    {
      title: "Barry's day at the zoo",
      snippet: 'Lorem ipsum dolar sit amet consectur',
    },
    {
      title: 'Barry at the supermarket',
      snippet: 'Lorem ipsum dolar sit amet consectur',
    },
    {
      title: "Barry's big party",
      snippet: 'Lorem ipsum dolar sit amet consectur',
    },
  ];
  res.render('index', { title: 'home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'about' });
});

// Redirects
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'create' });
});

// 404 redirect, middleware, don't need to scope out to URL if code has not matched up to this point
// Must go at bottom of file and manually add 404 error code
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
