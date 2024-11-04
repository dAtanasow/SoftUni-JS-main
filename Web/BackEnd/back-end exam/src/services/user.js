const { User } = require('../models/User');
const bcrypt = require('bcrypt');

const identityName = 'username';

async function register(email, identity, password) {
    const existing = await User.findOne({ [identityName]: identity });

    if (existing) {
        throw new Error(`This ${identityName} already exist`)
    }

    const user = new User({
        email,
        [identityName]: identity,
        password: await bcrypt.hash(password, 10)
    });

    await user.save();
    return user;
};

async function login(identity, password) {
    const user = await User.findOne({ [identityName]: identity });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return user;
};

module.exports = { register, login }
