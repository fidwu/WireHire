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

JobsRouter.route('/:jobId')
    .post((req, res, next) => {
        Jobs.findOne({ 
            _id: req.params.jobId,
            'appliedUsers.username': req.body.username 
        }, { new: true })
            .then(job => {
                // already applied
                if (job) {
                    res.statusCode = 405;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(job);
                }
                // add user to appliedUsers array
                else {
                    Jobs.findByIdAndUpdate(req.params.jobId, {
                        $push: {
                            "appliedUsers": req.body
                        }
                    }, { new: true })
                    .then(job => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(job); 
                    })
                    .catch(err => next(err));
                }
            })
            .catch(err => next(err))
    })

JobsRouter.route('/:userId')
    .get((req, res, next) => {
        Jobs
            .find({ "appliedUsers.username": req.params.userId })
            .then(job => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(job);
            })
            .catch(err => next(err))
    })

module.exports = JobsRouter; 