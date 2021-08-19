const express = require('express');
const Jobs = require('../models/jobs');
const JobsRouter = express.Router();

JobsRouter.route('/')
    .get((req, res, next) => {
        Jobs.find()
            .sort('-datePosted')
            .exec((err, job) => {
                if (err) {
                    next(err);
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(job);
                }
            })
    })

JobsRouter.route('/:userId/:jobId')
    .post((req, res, next) => {
        console.log(req.body);
        Jobs
            .findOneAndUpdate({username: req.params.userId, _id: req.params.jobId}, {
                $push: { appliedUsers: req.body }
            }, { new: true })
            .then(user => {
                console.log(user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(err => next(err))
    })

module.exports = JobsRouter; 