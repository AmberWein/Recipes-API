const validateRecipe = require("../middleware/validateRecipe");

describe("validateRecipe middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test("should call next if recipe is valid", () => {
    req.body = {
      title: "Test Recipe",
      description: "A valid description for recipe",
      ingredients: ["flour", "egg"],
      instructions: ["mix", "bake"],
      cookingTime: 30,
      servings: 4,
      difficulty: "easy"
    };

    validateRecipe(req, res, next);

    expect(next).toHaveBeenCalled(); // passes validation
  });

  test("should return 400 if required field missing", () => {
    req.body = {
      description: "Missing title",
      ingredients: ["egg"],
      instructions: ["cook"],
      cookingTime: 15,
      servings: 2,
      difficulty: "easy"
    };

    validateRecipe(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
    expect(next).not.toHaveBeenCalled();
  });
});