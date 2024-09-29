const { home, details, search } = require("../controllers/catalog");
const { about } = require("../controllers/about");
const { notFound } = require("../controllers/notFound");
const { createGet: createCastGet, createPost: createCastPost } = require('../controllers/cast')
const { attachGet, attachPost } = require("../controllers/attach");
const { movieRouter } = require("../controllers/movie");
const { userRouter } = require("../controllers/user");
const { isUser } = require("../middlewares/guards");


function routesConfig(app) {    
    app.get('/', home);
    app.get('/about', about);
    app.get('/search', search);
    
    app.get('/details/:id', details);
    app.get('/attach/:id', isUser(), attachGet);
    app.post('/attach/:id', isUser(), attachPost);
    
    app.get('/create/cast', isUser(), createCastGet);
    app.post('/create/cast', isUser(), createCastPost);
    
    
    app.use(movieRouter);
    app.use(userRouter);
    app.get('*', notFound);
}

module.exports = {
    routesConfig
}