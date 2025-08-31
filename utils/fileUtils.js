const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/recipes.json");

function readJSONFile() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return [];
  }
}

function writeJSONFile(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing JSON file:", err);
  }
}

module.exports = {
  readJSONFile,
  writeJSONFile,
};
