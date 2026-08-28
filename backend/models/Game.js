
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    // reviewGrade: {
    //     type: String,
    //     enum: ["Overwhelmingly Positive", "Very Positive", "Positive", "Mostly Positive", "Mixed", "Mostly Negative", "Negative", "Very Negative", "Overwhelmingly Negative"]
    // },
});

module.exports = mongoose.model('Game', gameSchema);
