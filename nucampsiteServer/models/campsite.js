const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// for working with currencies
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency; // set for shorthand

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    // added the image, cost, and featured to the model to complete the campsite data
    image: {
        type: String,
        required: true,
    },
    cost: {
        type: Currency,
        required: true,
        min: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;