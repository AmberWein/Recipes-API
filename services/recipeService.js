const { v4: uuidv4 } = require("uuid");
const { readJSONFile, writeJSONFile } = require("../utils/fileUtils");

exports.getRecipes = () => {
  return readJSONFile();
};

exports.getRecipeById = (id) => {
  const recipes = readJSONFile();
  return recipes.find(r => r.id === id);
};

exports.createRecipe = (recipe) => {
  const recipes = readJSONFile();
  const newRecipe = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    rating: 0,
    ...recipe
  };
  recipes.push(newRecipe);
  writeJSONFile(recipes);
  return newRecipe;
};

exports.updateRecipe = (id, updatedRecipe) => {
  const recipes = readJSONFile();
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) return null;

  recipes[index] = { ...recipes[index], ...updatedRecipe };
  writeJSONFile(recipes);
  return recipes[index];
};

exports.deleteRecipe = (id) => {
  const recipes = readJSONFile();
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) return false;

  recipes.splice(index, 1);
  writeJSONFile(recipes);
  return true;
};

exports.getRecipeStats = () => {
  const recipes = readJSONFile();
  const totalRecipes = recipes.length;
  const allIngredients = recipes.flatMap(r => r.ingredients);
  const uniqueIngredients = new Set(allIngredients);

  return {
    totalRecipes,
    totalIngredients: allIngredients.length,
    uniqueIngredients: uniqueIngredients.size
  };
};
