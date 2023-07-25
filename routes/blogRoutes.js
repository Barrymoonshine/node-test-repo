import express from 'express';
import {
  blog_index,
  blog_details,
  blog_get,
  blog_delete,
} from '../controllers/blogController.js';

// Set up an Express router, router has to be used inside an app
const blogRoutes = express.Router();

// Blog routes
blogRoutes.get('/', blog_index);

// Post handler, gets encoded data from the req object
blogRoutes.post('/', blog_details);

// Handle blog url anchor route parameters
blogRoutes.get('/:id', blog_get);

// Handle delete request from front end script in details
blogRoutes.delete('/:id', blog_delete);

export default blogRoutes;
