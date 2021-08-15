const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    company: String,
    title: String,
    startDate: Date,
    endDate: Date,
    isCurrent: Boolean,
    description: String
});

const educationSchema = new Schema({
    school: String,
    degree: String,
    startDate: Date,
    endDate: Date,
    gpa: Number
});

const profileSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String
    },
    experience: [experienceSchema],
    education: [educationSchema]
}, {
    timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;