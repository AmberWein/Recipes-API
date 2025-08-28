const express = require('express');
const morgan = require('morgan');

const app = express();

// add custom token for timestamp
morgan.token('timestamp', () => new Date().toISOString());

// plug morgan into Express as middleware
app.use(morgan(':timestamp :method :url :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
  res.send('Recipes API is running!');
});

module.exports = app;