function validateRecipe(req, res, next) {
  const { title, ingredients, instructions } = req.body;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Recipe must have a valid 'title' (string)." });
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res
      .status(400)
      .json({ error: "'ingredients' must be a non-empty array." });
  }

  if (!Array.isArray(instructions) || instructions.length === 0) {
    return res
      .status(400)
      .json({ error: "'instructions' must be a non-empty array." });
  }

  next();
}

module.exports = validateRecipe;
