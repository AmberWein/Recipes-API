const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req, res) => {
  res.send('Welcome to the Recipes API!');
});

module.exports = app;