const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const { get } = require("mongoose");

router.get('/', (req, res, next) => {
    Movie.find()
        .then(data => {
            console.log(data)
            res.render('movies/index', {data})
        })
        .catch(err => {
            next(err)
        })
})
router.get('/view/:id', (req, res, next) => {
    console.log("16")
    Movie.findById(req.params.id)
        .then(data => {
            console.log(data)
            res.render('movies/show', data)
        })
        .catch(err => {
            next(err)
        })
})
router.get('/new', (req, res, next) => {
    res.render('movies/new')
})
router.post('/', (req, res, next) => {
    const {title, genre, plot} = req.body;
    Movie.create({
        title: title, 
        genre: genre, 
        plot: plot
    })
    .then(() => {
        res.redirect('/movies')
    })
    .catch(err => {
        next(err)
    })
})



module.exports = router

