const recipeController = require('../controllers/recipeController');
const recipeService = require('../services/recipeService');

jest.mock('../services/recipeService');

describe('Recipe Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: '1' } };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  test('getAllRecipes should return recipes', () => {
    recipeService.getRecipes.mockReturnValue([{ id: '1', name: 'Test Recipe' }]);

    recipeController.getAllRecipes(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: '1', name: 'Test Recipe' }]);
  });

  test('getRecipeById should return recipe if found', () => {
    recipeService.getRecipeById.mockReturnValue({ id: '1', name: 'Test Recipe' });

    recipeController.getRecipeById(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Test Recipe' });
  });

  test('getRecipeById should return 404 if not found', () => {
    recipeService.getRecipeById.mockReturnValue(undefined);

    recipeController.getRecipeById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Recipe not found' });
  });
});