const { animalRouter } = require("../controllers/animal");
const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");

function routesConfig(app) {
    app.use(homeRouter);
    app.use(userRouter);
    app.use(animalRouter)
}

module.exports = { routesConfig }