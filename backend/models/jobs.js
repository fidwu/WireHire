const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    role: String,
    description: String,
    location: String,
    datePosted: Date,
    appliedUsers: [{
        username: String,
        dateApplied: {
            type: Date, 
            default: Date.now
        }
    }, {
        timestamps: true
    }]
});

const Jobs = mongoose.model('Jobs', jobsSchema);

module.exports = Jobs;