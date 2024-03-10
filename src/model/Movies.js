const { ObjectId } = require('mongodb');
const mongoose = require('../database/index');
const director = require('./Director');
const actors = require('./Actors');
const genres = require('./Genrer');

const MoviesSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    duration : {
        type: Number,
        required: true,
    },
    ratings : {
        type: Number,
        default: 0
    },
    quantRatings : {
        type: Number,
        default: 0
    },
    releaseYear : {
        type: String,
        required: true,
    },
    genres : {
        type: [genres.schema],
        required: true,
    },
    coverImage: {
        type: String,
    },
    directors: {
        type: [director.schema],
        required: true,
    },
    actors: {
        type: [actors.schema],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const movies = mongoose.model("Movies", MoviesSchema);

module.exports = movies;
