const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        default: '',
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        match: [/.+\@.+\..+/, 'Invalid email'],
        trim: true
    }
}, {timestamps: true});

var options = {
    errorMessages: {
        UserExistsError: 'Username already exists'
    }
};

userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', userSchema);