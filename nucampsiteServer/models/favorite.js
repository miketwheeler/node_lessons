const mongoose = require('mongoose');
const passprotLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    campsites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campsite',
    }],
})

favoriteSchema.plugin(passprotLocalMongoose);

module.exports = mongoose.model('Favorite', favoriteSchema);