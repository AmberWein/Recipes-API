// handle data/business logic

// mock data
const recipes = [
  { id: '1', name: 'Spaghetti Carbonara', ingredients: ['pasta', 'egg', 'bacon'] },
  { id: '2', name: 'Pancakes', ingredients: ['flour', 'milk', 'egg'] }
];

exports.getRecipes = () => recipes;

exports.getRecipeById = (id) => recipes.find(r => r.id === id);
