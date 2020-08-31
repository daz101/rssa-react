const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  rssa_id: { type: String, required: true },
  movie_id: { type: String, required: true },
  imdb_id: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: String, required: true },
  runtime: { type: String, required: true },
  genre: { type: String, required: true },
  aveRating: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String, required: true },
  description: { type: String, required: true },
  cast: { type: String, required: true },
  poster: { type: String, required: true }
});

const movie = mongoose.model("movie", movieSchema);

module.exports = movie;
