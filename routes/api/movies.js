const router = require("express").Router();
let Movie = require("../../models/movie.model");

router.route("/").get((req, res) => {
  Movie.find()
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const rssa_id = req.body.rssa_id;
  const movie_id = req.body.movie_id;
  const imdb_id = req.body.imdb_id;
  const title = req.body.title;
  const year = req.body.year;
  const runtime = req.body.runtime;
  const genre = req.body.genre;
  const aveRating = req.body.aveRating;
  const director = req.body.director;
  const writer = req.body.writer;
  const description = req.body.description;
  const cast = req.body.cast;
  const poster = req.body.poster;

  const newMovie = new Movie({
    rssa_id,
    movie_id,
    imdb_id,
    title,
    year,
    runtime,
    genre,
    aveRating,
    director,
    writer,
    description,
    cast,
    poster
  });

  newMovie
    .save()
    .then(() => res.json("Movie added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:movie_id").get((req, res) => {
  Movie.find({ movie_id: req.params.movie_id })
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route("/:id").get((req, res) => {
//   Movie.findById(req.params.id)
//     .then(movie => res.json(movie))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/:id").delete((req, res) => {
//   Movie.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Movie deleted."))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/update/:id").post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(movie => {
//       movie.rssa_id = Number(req.body.rssa_id);
//       movie.movie_id = Number(req.body.movie_id);
//       movie.imdb_id = Number(req.body.imdb_id);
//       movie.title = req.body.title;
//       movie.year = Number(req.body.year);
//       movie.runtime = Number(req.body.runtime);
//       movie.genre = req.body.genre;
//       movie.aveRating = Number(req.body.aveRating);
//       movie.director = req.body.director;
//       movie.writer = req.body.writer;
//       movie.description = req.body.description;
//       movie.cast = req.body.cast;
//       movie.poster = req.body.poster;

//       movie
//         .save()
//         .then(() => res.json("Movie updated!"))
//         .catch(err => res.status(400).json("Error: " + err));
//     })
//     .catch(err => res.status(400).json("Error: " + err));
// });

module.exports = router;
