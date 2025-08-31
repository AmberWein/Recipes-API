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
      title: "Chocolate Cake",
      description: "A delicious chocolate cake recipe",
      ingredients: ["flour", "cocoa", "sugar", "eggs"],
      instructions: ["Mix ingredients", "Bake for 30 minutes"],
      cookingTime: 45,
      servings: 6,
      difficulty: "medium"
    };

    validateRecipe(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test("should return 400 if title is missing", () => {
    req.body = {
      description: "Valid description",
      ingredients: ["flour", "egg"],
      instructions: ["Mix", "Bake"],
      cookingTime: 30,
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

  test("should return 400 if title length is <3 or >100", () => {
    req.body.title = "Hi"; // too short
    req.body.description = "Valid description for testing";
    req.body.ingredients = ["flour"];
    req.body.instructions = ["Mix"];
    req.body.cookingTime = 10;
    req.body.servings = 1;
    req.body.difficulty = "easy";

    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();

    // Too long
    req.body.title = "A".repeat(101);
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 if description is missing or invalid length", () => {
    req.body = {
      title: "Cake",
      description: "Short", // <10
      ingredients: ["flour"],
      instructions: ["Mix"],
      cookingTime: 20,
      servings: 2,
      difficulty: "easy"
    };

    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();

    req.body.description = "A".repeat(501); // >500
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 if ingredients is empty or not array", () => {
    req.body = {
      title: "Cake",
      description: "Valid description",
      ingredients: [], // empty
      instructions: ["Mix"],
      cookingTime: 20,
      servings: 2,
      difficulty: "easy"
    };
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();

    req.body.ingredients = "not-an-array";
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 if instructions is empty or not array", () => {
    req.body = {
      title: "Cake",
      description: "Valid description",
      ingredients: ["flour"],
      instructions: [], // empty
      cookingTime: 20,
      servings: 2,
      difficulty: "easy"
    };
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();

    req.body.instructions = "not-an-array";
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 if cookingTime is missing or not positive number", () => {
    req.body = {
      title: "Cake",
      description: "Valid description",
      ingredients: ["flour"],
      instructions: ["Mix"],
      cookingTime: -5, // invalid
      servings: 2,
      difficulty: "easy"
    };
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();

    req.body.cookingTime = "not-a-number";
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 if servings is missing or not positive integer", () => {
    req.body = {
      title: "Cake",
      description: "Valid description",
      ingredients: ["flour"],
      instructions: ["Mix"],
      cookingTime: 20,
      servings: 0, // invalid
      difficulty: "easy"
    };
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();

    req.body.servings = 1.5; // not integer
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 400 if difficulty is invalid", () => {
    req.body = {
      title: "Cake",
      description: "Valid description",
      ingredients: ["flour"],
      instructions: ["Mix"],
      cookingTime: 20,
      servings: 2,
      difficulty: "extreme" // invalid
    };
    validateRecipe(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});