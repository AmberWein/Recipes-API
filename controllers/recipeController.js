// controller to handle requests
const recipeService = require('../services/recipeService');

exports.getAllRecipes = (req, res) => {
  const recipes = recipeService.getRecipes();
  res.json(recipes);
};

exports.getRecipeById = (req, res) => {
  const { id } = req.params;
  const recipe = recipeService.getRecipeById(id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};
