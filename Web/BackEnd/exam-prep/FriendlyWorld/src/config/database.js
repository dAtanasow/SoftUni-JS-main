const mongoose = require('mongoose');
require('../models/User');
require('../models/Animal');

const connectionString = 'mongodb://localhost:27017/express-exam-prep';

async function databaseConfig() {
    await mongoose.connect(connectionString);
    console.log('Database connected');
}

module.exports = { databaseConfig }