const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getAllRecipes);
router.post("/", recipeController.createRecipe);

router.get("/stats/summary", recipeController.getRecipeStats);

router.get('/:id', recipeController.getRecipeById);
router.put("/:id", recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;