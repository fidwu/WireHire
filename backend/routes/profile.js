const express = require('express');
var mongoose = require('mongoose');
const Profile = require('../models/profile');
const profileRouter = express.Router();

profileRouter.route('/:userId')
    .get((req, res, next) => {
        console.log(req.params.userId);
        Profile.find({ username: req.params.userId })
            .then(profile => {
                console.log(profile);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(profile);
            })
            .catch(err => next(err));
    })
    .put((req, res, next) => {
        Profile
            .findOneAndUpdate({username: req.params.userId}, {
                phoneNum: req.body.phoneNum
            }, {
                new: true
            })
            .then(user => {
                console.log(user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(err => next(err))
    })

profileRouter.route('/:userId/:category')
    .post((req, res, next) => {
        console.log(req.body);
        Profile
            .findOneAndUpdate({username: req.params.userId}, {
                $push: { [req.params.category]: req.body }
            }, { new: true })
            .then(user => {
                console.log(user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(err => next(err))
    })

profileRouter.route('/:userId/:category/:itemId')
    .put((req, res, next) => {
        const objectId = mongoose.Types.ObjectId(req.params.itemId);
        console.log(req.params.userId);
        console.log(req.params.itemId);
        console.log(req.body);
        Profile
            .findOneAndUpdate({username: req.params.userId, 
                [req.params.category]: { $elemMatch: { "_id": objectId } }
            }, {
                $set: { [`${req.params.category}.$`]: { "_id": objectId, ...req.body } }
            },  { new: true })
            .then(user => {
                console.log(user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(err => next(err));
    })

    .delete((req, res, next) => {
        const objectId = mongoose.Types.ObjectId(req.params.itemId);
        console.log(req.params.userId);
        Profile
            .findOneAndUpdate({username: req.params.userId}, 
                {
                $pull: { [req.params.category]: { "_id": objectId } }
            },  { new: true })
            .then(user => {
                console.log(user.experience);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(err => next(err));
    })

module.exports = profileRouter; 