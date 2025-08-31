const recipeService = require('../services/recipeService');
const fileUtils = require('../utils/fileUtils');

jest.mock('../utils/fileUtils');

beforeEach(() => {
  fileUtils._resetMockData(); // reset mock data before each test
});

describe('Recipe Service', () => {
  test('should return all recipes', () => {
    const recipes = recipeService.getRecipes();
    expect(recipes.length).toBeGreaterThan(0);
    expect(recipes[0]).toHaveProperty('id');
  });

  test('should return a recipe by id', () => {
    const recipe = recipeService.getRecipeById('1');
    expect(recipe).toBeDefined();
    expect(recipe.title).toBe('Spaghetti Carbonara');
  });

  test('should return undefined for non-existent recipe', () => {
    const recipe = recipeService.getRecipeById('999');
    expect(recipe).toBeUndefined();
  });

  test('should create a new recipe', () => {
    const newRecipe = {
      title: 'Chocolate Cake',
      description: 'Delicious cake',
      ingredients: ['flour', 'cocoa', 'sugar', 'eggs'],
      instructions: ['Mix', 'Bake'],
      cookingTime: 45,
      servings: 6,
      difficulty: 'medium'
    };
    const created = recipeService.createRecipe(newRecipe);
    expect(created).toHaveProperty('id');
    expect(fileUtils.writeJSONFile).toHaveBeenCalled();
  });

  test('should update a recipe', () => {
    const updated = recipeService.updateRecipe('1', { title: 'Updated Title' });
    expect(updated.title).toBe('Updated Title');
    expect(fileUtils.writeJSONFile).toHaveBeenCalled();
  });

  test('should delete a recipe', () => {
    const success = recipeService.deleteRecipe('1');
    expect(success).toBe(true);
    expect(fileUtils.writeJSONFile).toHaveBeenCalled();
  });
});