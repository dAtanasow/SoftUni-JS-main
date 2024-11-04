const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const { Router } = require('express');
const { create, searchPlanets, getAll } = require("../services/planet");
const { parseError } = require("../../utils");
const { update, like } = require("../services/planet");
const { getById } = require("../services/planet");

const planetRouter = Router();

planetRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');
});

planetRouter.post('/create', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The Name should be at least characters'),
    body('age').trim().isFloat({ gt: 0 }).withMessage('The Age should be positive number'),
    body('solarSystem').trim().isLength({ min: 2 }).withMessage('The solar system should be at least 2 characters'),
    body('type').trim().isIn(['Inner', 'Outer', 'Dwarf']).withMessage('The Type should be one of the option [Inner, Outer, Dwarf]'),
    body('moons').trim().isFloat({ gt: 0 }).withMessage('The Moons should be positive number'),
    body('size').trim().isFloat({ gt: 0 }).withMessage('The Size should be positive number'),
    body('rings').trim().isIn(['Yes', 'No']).withMessage('The Rings should be one of the option [Yes, No]'),
    body('description').trim().isLength({ min: 10 }).withMessage('The Description should be a minimum of 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The Volcano Image should start with http:// or https://'),

    async (req, res) => {

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await create(req.body, req.user._id);

            res.redirect('/catalog')
        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
            return;
        }
    }
)

planetRouter.get('/edit/:id', isUser(), async (req, res) => {
    const planet = await getById(req.params.id);

    if (!planet) {
        res.render('404');
        return;
    }
    const isOwner = req.user?._id == planet.author.toString();

    if (!isOwner) {
        res.redirect('/login');
        return;
    }
    res.render('edit', { data: planet });
});

planetRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The Name should be at least characters'),
    body('age').trim().isFloat({ gt: 0 }).withMessage('The Age should be positive number'),
    body('solarSystem').trim().isLength({ min: 2 }).withMessage('The solar system should be at least 2 characters'),
    body('type').trim().isIn(['Inner', 'Outer', 'Dwarf']).withMessage('The Type should be one of the option [Inner, Outer, Dwarf]'),
    body('moons').trim().isFloat({ gt: 0 }).withMessage('The Moons should be positive number'),
    body('size').trim().isFloat({ gt: 0 }).withMessage('The Size should be positive number'),
    body('rings').trim().isIn(['Yes', 'No']).withMessage('The Rings should be one of the option [Yes, No]'),
    body('description').trim().isLength({ min: 10 }).withMessage('The Description should be a minimum of 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The Volcano Image should start with http:// or https://'),

    async (req, res) => {
        const planetId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await update(planetId, req.body, userId);

            res.redirect('/catalog/' + planetId)
        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
            return;
        }
    }
);

planetRouter.get('/like/:id', isUser(), async (req, res) => {
    const planetId = req.params.id;
    const user = req.user;

    try {
        result = await like(planetId, user);

        res.redirect('/catalog/' + planetId);
    } catch (err) {
        res.render('details', { errors: parseError(err).errors });
        return;
    }
});

planetRouter.get('/search', async (req, res) => {
    const { name, solarSystem } = req.query;

    const planets = await searchPlanets(name, solarSystem);


    res.render('search', { data: { name, solarSystem }, planets });
})

module.exports = { planetRouter }