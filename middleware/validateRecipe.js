function validateRecipe(req, res, next) {
  const { title, description, ingredients, instructions, cookingTime, servings, difficulty } = req.body;

  if (!title || typeof title !== "string" || title.length < 3 || title.length > 100) {
    return res.status(400).json({ error: "Recipe must have a valid 'title' (string, 3-100 chars)." });
  }

  if (!description || typeof description !== "string" || description.length < 10 || description.length > 500) {
    return res.status(400).json({ error: "Recipe must have a valid 'description' (string, 10-500 chars)." });
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "'ingredients' must be a non-empty array." });
  }

  if (!Array.isArray(instructions) || instructions.length === 0) {
    return res.status(400).json({ error: "'instructions' must be a non-empty array." });
  }

  if (typeof cookingTime !== "number" || cookingTime <= 0) {
    return res.status(400).json({ error: "'cookingTime' must be a positive number." });
  }

  if (!Number.isInteger(servings) || servings <= 0) {
    return res.status(400).json({ error: "'servings' must be a positive integer." });
  }

  const allowedDifficulties = ["easy", "medium", "hard"];
  if (!difficulty || !allowedDifficulties.includes(difficulty)) {
    return res.status(400).json({ error: `'difficulty' must be one of: ${allowedDifficulties.join(", ")}.` });
  }

  next();
}

module.exports = validateRecipe;