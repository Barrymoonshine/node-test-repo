import express from 'express';
import Blog from '../models/blog.js';

// Set up an Express router, router has to be used inside an app
const blogRoutes = express.Router();

// Blog routes
blogRoutes.get('/', (req, res) => {
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
blogRoutes.post('/', (req, res) => {
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
blogRoutes.get('/:id', (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Handle delete request from front end script in details
blogRoutes.delete('/:id', (req, res) => {
  const { id } = req.params;
  // Method to delete a doc
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

export default blogRoutes;
