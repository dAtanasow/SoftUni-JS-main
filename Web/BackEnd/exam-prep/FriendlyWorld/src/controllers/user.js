const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { createToken } = require("../services/jwt");
const { register, login } = require("../services/user");
const { isGuest } = require("../middlewares/guards");
const { parseError } = require("../../utils");

const userRouter = Router();

userRouter.get("/register", isGuest(), (req, res) => {
    res.render("register");
});

userRouter.post(
    "/register",
    isGuest(),
    body("email")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Email must be at least 10 characters long")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters long"),
    body("repass")
        .trim()
        .custom((value, { req }) => value == req.body.password)
        .withMessage("Passwords don't match"),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }

            const user = await register(email, password);
            const token = createToken(user);

            res.cookie("token", token);
            res.redirect("/");
        } catch (err) {
            res.render("register", {
                data: { email, password },
                errors: parseError(err).errors,
            });
            return;
        }
    }
);

userRouter.get("/login", isGuest(), (req, res) => {
    res.render("login");
});

userRouter.post("/login", isGuest(), async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("All fields are required");
        }

        const user = await login(email, password);
        const token = createToken(user);

        res.cookie("token", token);

        res.redirect("/");
    } catch (err) {
        res.render("login", { data: { email }, errors: parseError(err).errors });
        return;
    }
});

userRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = { userRouter };
