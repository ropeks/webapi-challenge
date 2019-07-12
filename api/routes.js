const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

// action routes

router.get('/actions', (req, res) => {
    Actions
        .get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'cannot retrieve actions' })
        })
});

router.post('/actions', (req, res) => {
    Actions
        .insert(req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'cannot add actions' })
        })
});

// project routes

router.get('/projects', (req, res) => {
    Projects
        .get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'cannot retrieve projects' })
        })
});

router.post('/projects', (req, res) => {
    Projects
        .insert(req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'cannot add projects' })
        })
});

module.exports = router;