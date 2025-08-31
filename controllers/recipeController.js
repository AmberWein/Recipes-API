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

exports.createRecipe = (req, res) => {
  const newRecipe = recipeService.createRecipe(req.body);
  res.status(201).json(newRecipe);
};

exports.updateRecipe = (req, res) => {
  const { id } = req.params;
  const updatedRecipe = recipeService.updateRecipe(id, req.body);

  if (updatedRecipe) {
    res.json(updatedRecipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

exports.deleteRecipe = (req, res) => {
  const { id } = req.params;
  const success = recipeService.deleteRecipe(id);

  if (success) {
    res.json({ message: 'Recipe deleted' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

exports.getRecipeStats = (req, res) => {
  const stats = recipeService.getRecipeStats();
  res.json(stats);
};