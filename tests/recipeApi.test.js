const request = require('supertest');
const express = require('express');
const recipeRoutes = require('../routes/recipeRoutes');
const recipeService = require('../services/recipeService');

jest.mock('../services/recipeService');

const app = express();
app.use(express.json());
app.use('/recipes', recipeRoutes);

describe('Recipe API Endpoints', () => {
  beforeEach(() => {
    // reset mock implementations
    recipeService.getRecipes.mockReturnValue([
      { id: '1', title: 'Test Recipe', description: 'Desc', ingredients: ['a'], instructions: ['b'], cookingTime: 30, servings: 2, difficulty: 'easy' }
    ]);

    recipeService.getRecipeById.mockImplementation(id => 
      id === '1' ? { id: '1', title: 'Test Recipe', description: 'Desc', ingredients: ['a'], instructions: ['b'], cookingTime: 30, servings: 2, difficulty: 'easy' } : undefined
    );

    recipeService.createRecipe.mockImplementation(data => ({ id: '2', ...data }));
    recipeService.updateRecipe.mockImplementation((id, data) => id === '1' ? { id: '1', ...data } : null);
    recipeService.deleteRecipe.mockImplementation(id => id === '1');
    recipeService.getRecipeStats.mockReturnValue({
      totalRecipes: 1,
      totalIngredients: 1,
      uniqueIngredients: 1
    });
  });

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

  test('POST /recipes with valid data should create recipe', async () => {
    const newRecipe = {
      title: "Chocolate Cake",
      description: "Delicious cake",
      ingredients: ["flour", "sugar", "cocoa"],
      instructions: ["Mix", "Bake"],
      cookingTime: 45,
      servings: 6,
      difficulty: "medium"
    };
    const res = await request(app).post('/recipes').send(newRecipe);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newRecipe.title);
  });

  test('POST /recipes with invalid data should return 400', async () => {
    const invalidRecipe = { title: "Hi" }; // too short, missing fields
    const res = await request(app).post('/recipes').send(invalidRecipe);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('PUT /recipes/1 should update recipe', async () => {
    const updateData = { title: "Updated Recipe" };
    const res = await request(app).put('/recipes/1').send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(updateData.title);
  });

  test('PUT /recipes/999 should return 404', async () => {
    const res = await request(app).put('/recipes/999').send({ title: "Fail" });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /recipes/1 should delete recipe', async () => {
    const res = await request(app).delete('/recipes/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Recipe deleted');
  });

  test('DELETE /recipes/999 should return 404', async () => {
    const res = await request(app).delete('/recipes/999');
    expect(res.statusCode).toBe(404);
  });

  test('GET /recipes/stats/summary should return stats', async () => {
    const res = await request(app).get('/recipes/stats/summary');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalRecipes');
  });

  test('POST /recipes with malformed JSON should return 400', async () => {
    const res = await request(app)
      .post('/recipes')
      .set('Content-Type', 'application/json')
      .send('{"title": "Broken JSON"'); // missing closing bracket
    expect(res.statusCode).toBe(400);
  });

});
