const { ObjectId } = require('mongodb');
const mongoose = require('../database/index');
const movies = require('./Movies');

const AvaliationSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
    },
    idUser: {
        type: ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    infoMovie: {
        type: movies.schema,
        required: true
    }
});

const avaliation = mongoose.model("Avaliation", AvaliationSchema);

module.exports = avaliation;
