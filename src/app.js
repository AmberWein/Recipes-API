const express = require('express');
const morgan = require('morgan');

const recipeRoutes = require('../routes/recipeRoutes');


const app = express();

// Middleware
morgan.token('timestamp', () => new Date().toISOString());
app.use(morgan(':timestamp :method :url :status :res[content-length] - :response-time ms'));

// Routes
app.use('/recipes', recipeRoutes);

app.get('/', (req, res) => {
  res.send('Recipes API is running!');
});

module.exports = app;