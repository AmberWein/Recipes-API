// handle data/business logic

// mock data
let recipes = [
  { id: '1', name: 'Spaghetti Carbonara', ingredients: ['pasta', 'egg', 'bacon'] },
  { id: '2', name: 'Pancakes', ingredients: ['flour', 'milk', 'egg'] }
];

exports.getRecipes = () => recipes;

exports.getRecipeById = (id) => recipes.find(r => r.id === id);

exports.createRecipe = (recipe) => {
  const newRecipe = { id: String(Date.now()), ...recipe };
  recipes.push(newRecipe);
  return newRecipe;
};

exports.updateRecipe = (id, updatedRecipe) => {
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) return null;

  recipes[index] = { ...recipes[index], ...updatedRecipe };
  return recipes[index];
};

exports.deleteRecipe = (id) => {
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) return false;

  recipes.splice(index, 1);
  return true;
};

// simple stats: total recipes, unique ingredients count
exports.getRecipeStats = () => {
  const totalRecipes = recipes.length;
  const allIngredients = recipes.flatMap(r => r.ingredients);
  const uniqueIngredients = new Set(allIngredients);

  return {
    totalRecipes,
    totalIngredients: allIngredients.length,
    uniqueIngredients: uniqueIngredients.size
  };
};