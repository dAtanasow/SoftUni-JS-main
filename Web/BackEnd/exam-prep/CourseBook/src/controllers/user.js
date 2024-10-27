const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { createToken } = require("../services/jwt");
const { register, login } = require("../services/user");
const { isGuest } = require("../middlewares/guards");
const { parseError } = require("../../utils");

const userRouter = Router();

userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register')
});

userRouter.post('/register',
    isGuest(),
    body('username').trim().isLength({ min: 2 })
        .withMessage('The username should be at least 2 characters long'),
    body('email').trim().isEmail()
        .withMessage('Invalid email format')
        .isLength({ min: 10 })
        .withMessage('The email should be at least 10 characters long'),
    body('password').trim().isLength({ min: 4 })
        .withMessage('The password should be at least 4 characters long'),
    body('repass').trim().custom((value, { req }) => value == req.body.password)
        .withMessage('Passwords don\'t match'),
    async (req, res) => {
        const { email, username, password } = req.body;

        try {
            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }

            const user = await register(email, username, password);
            const token = createToken(user);

            res.cookie('token', token)
            res.redirect('/');
        } catch (err) {
            res.render('register', { data: { email, username }, errors: parseError(err).errors });
            return;
        }
    });

userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

userRouter.post('/login', isGuest(), async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error('All fields are required')
        }

        const user = await login(email, password);
        const token = createToken(user);

        res.cookie('token', token);

        res.redirect('/');
    } catch (err) {
        res.render('login', { data: { email }, errors: parseError(err).errors });
        return;
    }
});

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = {
    userRouter
};