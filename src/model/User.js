const mongoose = require('../database/index');
const bcryptjs = require("bcryptjs");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ['client', 'admin']
    },
    active: {
        type: Boolean,
        default: true
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

usersSchema.pre("save", async function(next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
});

const user = mongoose.model("Users", usersSchema);

module.exports = user;
