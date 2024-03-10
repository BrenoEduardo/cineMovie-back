const { ObjectId } = require('mongodb');
const mongoose = require('../database/index');

const DirectorsSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
    },
    directorName: {
        type: String,
        required: true,
    },
});

const director = mongoose.model("Director", DirectorsSchema);

module.exports = director;
