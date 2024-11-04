const mongoose = require('mongoose');
require('../models/User');
require('../models/Planet');

const connectionString = 'mongodb://localhost:27017/backend-exam';

async function databaseConfig() {
    await mongoose.connect(connectionString);

    console.log('Database connected');
    
}

module.exports = { databaseConfig }