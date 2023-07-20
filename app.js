import express from 'express';
import { URL } from 'url';

// Fix for error __dirname is not defined as not available by default in ES module
const __dirname = new URL('.', import.meta.url).pathname;

// Set up an Express app
const app = express();

// Listen for requests, local host inferred
app.listen(3000);

// Two arguments, what path to listen to and req and res objects call back function
app.get('/', (req, res) => {
  // Express method, no need to set header and infers status code (200)
  // .sendFile looks for absolute path, second argument (object) states the relative root
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
});
