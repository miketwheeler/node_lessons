const express = require('express');
const cors = require('./cors');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const user = require('../models/user');

const favoriteRouter = express.Router();


favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
    .populate('user')
    .populate('campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
        if(favorite) {
            req.body.forEach(favorite => {
                if(!favorite.campsites.includes(favorite._id)) {
                    favorite.campsites.push(favorite._id);
                }
            })
            favorite.save();
        }
        else {
            Favorite.create({
                user: req.user._id,
                campsites: req.body
            })
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id })
    .then(favorite => {
        res.statusCode = 200;
        if(favorite) {
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }
        else {
            res.setHeader('Content-Type', 'text/plain')
            res.end('You do not have any favorites to delete.');
        }
    })
    .catch(err => next(err));
});

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// specific campsite (byID) 
favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.findById(req.params.campsiteId) 
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
        .then(favorites => {
            if (favorites) {
                if (favorites.campsites.includes(req.params.campsiteId)) {
                    res.end('This campsite is already a favorite');
                } else {
                    favorites.campsites.push(req.params.campsiteId);
                    favorites.save()
                        .then(favorites => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorites);
                        })
                }
            } else {
                Favorite.create({
                    user: req.user._id,
                    campsites: [{ _id: req.params.campsiteId }]
                })
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }
        })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
// 
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorites => {
        if(favorites) {
            favorites.campsites = favorites.campsites.filter(campsiteId => campsiteId.toString() !== req.params.campsiteId );
            favorites.save()
            .then(remainingFavorites => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(remainingFavorites);
            })
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end("There are no favorites to delete!");
        }
    })
    .catch(err => next(err));
})


module.exports = favoriteRouter;