const request = require('supertest');
const express = require('express');
const recipeRoutes = require('../routes/recipeRoutes');

jest.mock('../services/recipeService');
const recipeService = require('../services/recipeService');

const app = express();
app.use(express.json());
app.use('/recipes', recipeRoutes);

beforeEach(() => {
  // reset mock implementations before each test
  recipeService.getRecipes.mockReturnValue([
    { id: '1', title: 'Test Recipe' }
  ]);

  recipeService.getRecipeById.mockImplementation((id) =>
    id === '1' ? { id: '1', title: 'Test Recipe' } : undefined
  );
});

describe('Recipe Routes', () => {
  test('GET /recipes should return all recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /recipes/1 should return a recipe', async () => {
    const res = await request(app).get('/recipes/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', '1');
  });

  test('GET /recipes/999 should return 404', async () => {
    const res = await request(app).get('/recipes/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Recipe not found');
  });
});