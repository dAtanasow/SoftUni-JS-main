const mongoose = require('mongoose');
require('../models/Movie');
require('../models/Cast');
require('../models/User');

const connectionString = 'mongodb://127.0.0.1:27017/movie-magic';

async function databaseConfig() {
    await mongoose.connect(connectionString);

}

module.exports = { databaseConfig }