const recipeService = require('../services/recipeService');

describe('Recipe Service', () => {
  test('should return all recipes', () => {
    const recipes = recipeService.getRecipes();
    expect(recipes.length).toBeGreaterThan(0);
    expect(recipes[0]).toHaveProperty('id');
  });

  test('should return a recipe by id', () => {
    const recipe = recipeService.getRecipeById('1');
    expect(recipe).toBeDefined();
    expect(recipe.name).toBe('Spaghetti Carbonara');
  });

  test('should return undefined for non-existent recipe', () => {
    const recipe = recipeService.getRecipeById('999');
    expect(recipe).toBeUndefined();
  });
});