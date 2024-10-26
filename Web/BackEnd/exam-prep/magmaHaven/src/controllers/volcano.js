const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const { Router } = require('express');
const { create } = require("../services/volcano");
const { parseError } = require("../../utils");
const { update } = require("../services/volcano");
const { getById } = require("../services/volcano");

const volcanoRouter = Router();

volcanoRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');
});

volcanoRouter.post('/create', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The Name should be at least characters'),
    body('location').trim().isLength({ min: 3 }).withMessage('The Location should be at least 3 characters'),
    body('elevation').trim().isFloat({ min: 0 }).withMessage('The Elevation should be minimum 0'),
    body('lastEruption').trim().isInt({ min: 0, max: 2024 }).withMessage('The Year of Last Eruption should be between 0 and 2024'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The Volcano Image should start with http:// or https://'),
    body('type').trim().isIn(['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield']).withMessage('The Type should be select between [Supervolcanoes, Submarine, Subglacial, Mud, Stratovolcanoes, Shield'),
    body('description').trim().isLength({ min: 10 }).withMessage('The Description should be a minimum of 10 characters long'),

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

volcanoRouter.get('/edit/:id', isUser(), async (req, res) => {
    const volcano = await getById(req.params.id);

    if (!volcano) {
        res.render('404');
        return;
    }
    const isOwner = req.user?._id == volcano.author.toString();

    if (!isOwner) {
        res.redirect('/login');
        return;
    }
    res.render('edit', { data: volcano });
});

volcanoRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The Name should be at least characters'),
    body('location').trim().isLength({ min: 3 }).withMessage('The Location should be at least 3 characters'),
    body('elevation').trim().isFloat({ min: 0 }).withMessage('The Elevation should be minimum 0'),
    body('lastEruption').trim().isInt({ min: 0, max: 2024 }).withMessage('The Year of Last Eruption should be between 0 and 2024'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The Volcano Image should start with http:// or https://'),
    body('type').trim().isIn(['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield']).withMessage('The Type should be select between [Supervolcanoes, Submarine, Subglacial, Mud, Stratovolcanoes, Shield'),
    body('description').trim().isLength({ min: 10 }).withMessage('The Description should be a minimum of 10 characters long'),

    async (req, res) => {
        const volcanoId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await update(volcanoId, req.body, userId);

            res.redirect('/catalog/' + volcanoId)
        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
            return;
        }
    }
);



module.exports = { volcanoRouter }