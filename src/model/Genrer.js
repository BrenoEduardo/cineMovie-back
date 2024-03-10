const { ObjectId } = require('mongodb');
const mongoose = require('../database/index');

const GenresSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
    },
    genresName: {
        type: String,
        required: true,
    },
});

const genres = mongoose.model("Genres", GenresSchema);

module.exports = genres;
