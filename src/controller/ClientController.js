const express = require("express");
const MoviesModel = require("../model/Movies");
const AvaliationModel = require("../model/Avaliation");

const router = express.Router();

router.get("/getAllMovies", async (req, res) => {
  try {
    const movies = await MoviesModel.find();

    return res.json({
      error: false,
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Ocorreu um erro ao buscar os usuários.",
    });
  }
});
router.post("/avaliation-movies", async (req, res) => {
  try {
    const { idUser, rating, infoMovie } = req.body;

    if (!idUser || !rating || !infoMovie) {
      return res
        .status(400)
        .json({ error: "Missing information in request body" });
    }
    await AvaliationModel.create(req.body);

    const { _id } = infoMovie;
    const avaliationsForMovie = await AvaliationModel.find({
      "infoMovie._id": _id,
    });
    let totalRating = 0;
    for (const aval of avaliationsForMovie) {
      totalRating += aval.rating;
    }

    const averageRating = totalRating / avaliationsForMovie.length;
    await MoviesModel.findByIdAndUpdate(_id, {
      $set: {
        ratings: averageRating,
        quantRatings: avaliationsForMovie.length,
      },
    });

    return res.json({
      success: true,
      message: "Avaliação registrada com sucesso",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/filterMovies", async (req, res) => {
  try {
    const { typeFilter, filter } = req.body;
    let query = {};
    if (typeFilter && filter) {
      if (Array.isArray(typeFilter)) {
        query = {
          $or: typeFilter.map((type, index) => {
            if (type === "name") {
              return { name: { $regex: filter, $options: "i" } };
            } else if (type === "directors") {
              return {
                "directors.directorName": {
                  $regex: filter,
                  $options: "i",
                },
              };
            } else if (type === "actors") {
              return {
                "actors.actorName": { $regex: filter, $options: "i" },
              };
            } else if (type === "genres") {
              return {
                "genres.genresName": { $regex: filter, $options: "i" },
              };
            }
          }),
        };
      } else {
        if (typeFilter === "name") {
          query = { name: { $regex: filter, $options: "i" } };
        } else if (typeFilter === "directors") {
          query = {
            "directors.directorName": { $regex: filter, $options: "i" },
          };
        } else if (typeFilter === "actors") {
          query = { "actors.actorName": { $regex: filter, $options: "i" } };
        } else if (typeFilter === "genres") {
          query = { "genres.genresName": { $regex: filter, $options: "i" } };
        }
      }
    }
    const movies = await MoviesModel.find(query);

    return res.json({
      error: false,
      data: movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
