const { Schema, model, Types } = require('mongoose');

const animalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    years: {
        type: Number,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    need: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    donationList: {
        type: [Types.ObjectId],
        ref: 'User'
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
});
const Animal = model('Animal', animalSchema);
module.exports = { Animal };