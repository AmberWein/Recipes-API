// handle data/business logic

const { v4: uuidv4 } = require("uuid");

// mock data
let recipes = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish',
    ingredients: ['pasta', 'egg', 'bacon'],
    instructions: ['Boil pasta', 'Cook bacon', 'Mix together'],
    cookingTime: 30,
    servings: 2,
    difficulty: 'easy',
    rating: 4.5,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Pancakes',
    description: 'Fluffy breakfast pancakes',
    ingredients: ['flour', 'milk', 'egg'],
    instructions: ['Mix ingredients', 'Cook on skillet'],
    cookingTime: 15,
    servings: 4,
    difficulty: 'easy',
    rating: 4.0,
    createdAt: new Date().toISOString()
  }
];

exports.getRecipes = () => recipes;

exports.getRecipeById = (id) => recipes.find(r => r.id === id);

exports.createRecipe = (recipe) => {
  const newRecipe = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    rating: 0, // initial rating
    ...recipe
  };
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