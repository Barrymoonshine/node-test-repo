import express from 'express';

// Set up an Express app
const app = express();

// Listen for requests, local host inferred
app.listen(3000);

// Two arguments, what path to listen to
app.get('/');
