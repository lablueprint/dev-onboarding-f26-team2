const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const seedPath = path.join(dataDir, 'movies.seed.json');
const dataPath = path.join(dataDir, 'movies.json');

// movies.json is the runtime copy and is gitignored. Create it from the seed
// the first time the server starts so later edits survive restarts.
function loadMovies() {
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.copyFileSync(seedPath, dataPath);
  }

  const movies = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  if (!Array.isArray(movies)) {
    throw new Error('movies.json must contain an array');
  }
  return movies;
}

module.exports = { loadMovies };
