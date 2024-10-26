const {urlencoded, static: staticHandler} = require("express");
const cookieParser = require('cookie-parser');
const {session} = require('../middlewares/session')

const secret = "what a secret"

function expressConfig(app) {
    app.use(cookieParser(secret));
    app.use(session());
    app.use(urlencoded({ extended: false }));
    app.use('/static', staticHandler('static'));
}

module.exports = {
    expressConfig
}
