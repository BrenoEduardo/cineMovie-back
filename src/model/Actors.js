const { ObjectId } = require('mongodb');
const mongoose = require('../database/index');

const ActorsSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
    },
    actorName: {
        type: String,
        required: true,
    },
});

const actors = mongoose.model("Actors", ActorsSchema);

module.exports = actors;
