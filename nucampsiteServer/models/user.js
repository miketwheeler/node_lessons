const mongoose = require('mongoose');
const passprotLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        default: '',
    },
    lastname: {
        type: String,
        default: '',
    },
    facebookId: String,
    admin: {
        type: Boolean,
        default: false,
    },
})

userSchema.plugin(passprotLocalMongoose);

module.exports = mongoose.model('User', userSchema);