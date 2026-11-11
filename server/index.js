const cors = require('cors');
const express = require('express');

const { loadMovies } = require('./movies');

const movies = loadMovies();
const app = express();

app.use(cors());

app.get('/movies', (req, res) => {
  const genre = req.query.genre;
  if (typeof genre === 'string' && genre.length > 0) {
    res.json(movies.filter((movie) => movie.genre === genre));
    return;
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find((item) => item.id === req.params.id);
  if (!movie) {
    res.status(404).json({ error: 'Movie not found' });
    return;
  }
  res.json(movie);
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Movie API listening on http://0.0.0.0:${port}`);
});
