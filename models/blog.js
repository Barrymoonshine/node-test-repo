import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema/ structure, auto creates timestamps
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model surrounds Schema and provides comms interface
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
