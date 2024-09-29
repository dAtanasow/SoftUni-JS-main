const express = require('express');
const { databaseConfig } = require('./config/database');
const { hbsConfig } = require('./config/hbs');
const { expressConfig } = require('./config/express');
const { routesConfig } = require('./config/routes');

start();
async function start() {
    const app = express();

    await databaseConfig();
    hbsConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(3000, () => console.log('Application is running on port 3000'));
}