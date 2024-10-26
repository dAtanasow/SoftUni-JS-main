const mongoose = require('mongoose');
require('../models/User');
require('../models/Data');

const connectionString = 'mongodb://localhost:27017/course-book';

async function databaseConfig() {
    await mongoose.connect(connectionString);

    console.log('Database connected');
    
}

module.exports = { databaseConfig }