const mockData = [
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

let data = [...mockData];

module.exports = {
  readJSONFile: jest.fn(() => [...data]),
  writeJSONFile: jest.fn((newData) => { data = [...newData]; }),
  _resetMockData: () => { data = [...mockData]; }
};
