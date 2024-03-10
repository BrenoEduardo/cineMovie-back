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
      return res.status(400).json({ error: "Missing information in request body" });
    }
    await AvaliationModel.create(req.body)

    const { _id } = infoMovie;
    const avaliationsForMovie = await AvaliationModel.find({ "infoMovie._id": _id });
    let totalRating = 0;
    for (const aval of avaliationsForMovie) {
      totalRating += aval.rating;
    }

    const averageRating = totalRating / avaliationsForMovie.length;
    await MoviesModel.findByIdAndUpdate(
      _id,
      { $set: { ratings: averageRating, quantRatings: avaliationsForMovie.length } },
    );

    return res.json({ success: true, message: "Avaliação registrada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
