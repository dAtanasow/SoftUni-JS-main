const { courseRouter } = require("../controllers/course");
const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");

function routesConfig(app) {
    app.use(homeRouter);
    app.use(userRouter);
    app.use(courseRouter);
}

module.exports = {routesConfig}