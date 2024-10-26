const { homeRouter } = require("../controllers/home")

function routesConfig(app) {
    app.use(homeRouter);
}

module.exports = {routesConfig}