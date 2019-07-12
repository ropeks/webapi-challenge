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

router.delete('/actions/:id', (req, res) => {
    Actions
        .remove(req.params.id)
        .then(data => {
            res.status(200)
            .json({ message: 'the action has been deleted' });
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'cannot delete action' })
        })
});

router.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    Actions
        .update(id, req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'cannot update action' })
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

router.post('/projects', validateProject, (req, res) => {
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

router.delete('/projects/:id', (req, res) => {
    Projects
        .remove(req.params.id)
        .then(data => {
            res.status(200)
            .json({ message: 'the project has been deleted' });
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'cannot delete project' })
        })
});

router.put('/projects/:id', validateProject, (req, res) => {
    const { id } = req.params;
    Projects
        .update(id, req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'cannot update project' })
        })
});

// middleware

function validateProject(req, res, next) {
    const { body } = req;
    if (Object.keys(body).length === 0) {
        res
          .status(400)
          .json({message: "missing request body"});
    } else if (body.name && body.description) {
        next();
    } else {
        res
          .status(400)
          .json({message: "missing required name or description field"});
    }
}

module.exports = router;