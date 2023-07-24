import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { render } from 'ejs';
import Blog from './models/blog.js';
import mongoAtlasPw from './config.js';
// import { URL } from 'url';

// Fix for error __dirname is not defined as not available by default in ES module
// Only needed with .sendFile method
// const __dirname = new URL('.', import.meta.url).pathname;

// Connect to mongoDB
const dbURI = `mongodb+srv://barrymoonshine:${mongoAtlasPw}@cluster0.wym9xjg.mongodb.net/?retryWrites=true&w=majority`;

// Set up an Express app
const app = express();

// Async method
// Listen for requests, local host inferred
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
// Takes URL encoded POST data and encoded it onto the req object
app.use(express.urlencoded({ extended: true }));
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
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'about' });
});

// Blog routes
app.get('/blogs', (req, res) => {
  // sort in descending order
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'all blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post handler, gets encoded data from the req object
app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

// Handle blog url anchor route parameters
app.get('/blogs/:id', (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
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
