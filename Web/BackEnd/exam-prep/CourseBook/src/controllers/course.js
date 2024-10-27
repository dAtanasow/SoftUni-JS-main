const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const { Router } = require('express');
const { create, deleteById, sign } = require("../services/course");
const { parseError } = require("../../utils");
const { update } = require("../services/course");
const { getById } = require("../services/course");

const courseRouter = Router();

courseRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');
});

courseRouter.post('/create', isUser(),
    body('title').trim().isLength({ min: 5 }).withMessage('Title should be at least 5 characters'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Image should start with http:// or https://'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description should be a minimum of 10 characters long'),
    body('type').trim().isLength({ min: 3 }).withMessage('Type should be at least 3 characters'),
    body('certificate').trim().isLength({ min: 2 }).withMessage('Certificate should be at least 2 characters'),
    body('price').trim().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
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

courseRouter.get('/edit/:id', isUser(), async (req, res) => {
    const course = await getById(req.params.id);

    if (!course) {
        res.render('404');
        return;
    }
    const isOwner = req.user?._id == course.author.toString();

    if (!isOwner) {
        res.redirect('/login');
        return;
    }
    res.render('edit', { data: course });
});

courseRouter.post('/edit/:id', isUser(),
    body('title').trim().isLength({ min: 5 }).withMessage('Title should be at least 5 characters'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Image should start with http:// or https://'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description should be a minimum of 10 characters long'),
    body('type').trim().isLength({ min: 3 }).withMessage('Type should be at least 3 characters'),
    body('certificate').trim().isLength({ min: 2 }).withMessage('Certificate should be at least 2 characters'),
    body('price').trim().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

    async (req, res) => {
        const courseId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await update(courseId, req.body, userId);

            res.redirect('/catalog/' + courseId)
        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
            return;
        }
    }
);

courseRouter.get('/delete/:id', isUser(), async (req, res) => {
    const courseId = req.params.id;

    try {
        await deleteById(courseId, req.user._id);
    } catch (err) {
        if (err.message == 'Access denied') {
            res.redirect('/login');
            return;
        }
    }
    res.redirect('/catalog');
})

courseRouter.get('/sign/:id', isUser(), async (req, res) => {
    const courseId = req.params.id;
    const user = req.user;
    
    try {
        result = await sign(courseId, user);
        
        res.redirect('/catalog/' + courseId);
    } catch (err) {
        res.render('details', { errors: parseError(err).errors });
        return;
    }
});

module.exports = { courseRouter }