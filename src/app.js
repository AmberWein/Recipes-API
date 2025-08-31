const express = require('express');
const morgan = require('morgan');

const recipeRoutes = require('./routes/recipes');
const errorHandler = require('./middleware/errorHandler');


const app = express();

// Middleware
morgan.token('timestamp', () => new Date().toISOString());
app.use(morgan(':timestamp :method :url :status :res[content-length] - :response-time ms'));

// Routes
app.use('/recipes', recipeRoutes);

app.use(errorHandler);

module.exports = app;