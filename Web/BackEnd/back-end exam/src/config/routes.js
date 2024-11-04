const { homeRouter } = require("../controllers/home");
const { planetRouter } = require("../controllers/planet");
const { userRouter } = require("../controllers/user");

function routesConfig(app) {
    app.use(homeRouter);
    app.use(userRouter);
    app.use(planetRouter);
    app.get('**', (req,res) => {
        res.render('404');
    });
}

module.exports = {routesConfig}