const express = require("express");
const { hbsConfig } = require("./config/hbs");
const { expressConfig } = require("./config/express");
const { databaseConfig } = require("./config/database");
const { routesConfig } = require("./config/routes");

const port = process.env.port || 3000;

async function start() {
    const app = express();

    await databaseConfig()
    hbsConfig(app);
    expressConfig(app);
    routesConfig(app);
    
    app.listen(port, () => {
        console.log(`Application running on port: ${port}`);
    });
}

start();