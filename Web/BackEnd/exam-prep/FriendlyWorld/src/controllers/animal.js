const { Router } = require('express');
const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../../utils");
const { create, update, getById, deleteById, donate } = require("../services/animal");

const animalRouter = Router();

animalRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');
})

animalRouter.post('/create', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('kind').trim().isLength({ min: 3 }).withMessage('Kind must be at least 3 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Image should start with http:// or https://'),
    body('years').trim().isInt({ min: 1, max: 100 }).withMessage('Age must be between 1 and 100'),
    body('need').trim().isLength({ min: 3, max: 20 }).withMessage('Need must be between 3 and 20 characters long'),
    body('description').trim().isLength({ min: 5, max: 50 }).withMessage('Description must be between 5 and 50 characters long'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('Location must be between 5 and 15 characters long'),

    async (req, res) => {
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            result = await create(req.body, req.user._id);
            res.redirect('/dashboard');
        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
            return;
        }
    });

animalRouter.get('/edit/:id', isUser(), async (req, res) => {
    const animal = await getById(req.params.id);

    if (!animal) {
        res.render('404');
        return;
    }
    const isOwner = req.user?._id == animal.author.toString();

    if (!isOwner) {
        res.redirect('/login');
        return;
    }
    res.render('edit', { data: animal });
});


animalRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('kind').trim().isLength({ min: 3 }).withMessage('Kind must be at least 3 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Image should start with http:// or https://'),
    body('years').trim().isInt({ min: 1, max: 100 }).withMessage('Age must be between 1 and 100'),
    body('need').trim().isLength({ min: 3, max: 20 }).withMessage('Need must be between 3 and 20 characters long'),
    body('description').trim().isLength({ min: 5, max: 50 }).withMessage('Description must be between 5 and 50 characters long'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('Location must be between 5 and 15 characters long'),

    async (req, res) => {
        const animalId = req.params.id;
        const userId = req.user._id;
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            result = await update(animalId, req.body, userId);
            res.redirect('/dashboard/' + animalId);
        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
            return;
        }
    });

animalRouter.get('/delete/:id', isUser(), async (req, res) => {
    const animalId = req.params.id;

    try {
        await deleteById(animalId, req.user._id);
    } catch (err) {
        if (err.message == 'Access denied') {
            res.redirect('/login');
            return;
        }
    }
    res.redirect('/dashboard');
})

animalRouter.get('/donate/:id', isUser(), async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;

    try {
        result = await donate(animalId, userId);
        res.redirect('/dashboard/' + animalId);
    } catch (err) {
        res.render('details', { errors: parseError(err).errors });
        return;
    }
});

module.exports = { animalRouter };