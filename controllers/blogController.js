import Blog from '../models/blog.js';

// Blog index
const blog_index = (req, res) => {
  // sort in descending order
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'all blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Blog details
const blog_details = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
};

// Blog create get
const blog_get = (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Blog delete
const blog_delete = (req, res) => {
  const { id } = req.params;
  // Method to delete a doc
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { blog_index, blog_details, blog_get, blog_delete };
