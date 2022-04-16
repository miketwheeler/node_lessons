const mongoose = require('mongoose');
const passprotLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false,
    },
})

userSchema.plugin(passprotLocalMongoose);

module.exports = mongoose.model('User', userSchema);;