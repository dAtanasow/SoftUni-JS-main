const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");
const { volcanoRouter } = require("../controllers/volcano");

function routesConfig(app) {
    app.use(homeRouter);
    app.use(volcanoRouter);
    app.use(userRouter)
}

module.exports = {routesConfig}