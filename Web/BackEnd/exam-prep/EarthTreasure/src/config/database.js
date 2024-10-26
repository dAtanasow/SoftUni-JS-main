const mongoose = require('mongoose');
require('../models/User');
require('../models/Stone');

const connectionString = 'mongodb://localhost:27017/express-exam';

async function databaseConfig() {
    await mongoose.connect(connectionString);

    console.log('Database connected');
    
}

module.exports = { databaseConfig }