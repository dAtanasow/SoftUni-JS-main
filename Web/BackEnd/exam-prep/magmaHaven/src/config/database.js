const mongoose = require('mongoose');
require('../models/User');
require('../models/Volcano');

const connectionString = 'mongodb://localhost:27017/volcano';

async function databaseConfig() {
    await mongoose.connect(connectionString);

    console.log('Database connected');
    
}

module.exports = { databaseConfig }