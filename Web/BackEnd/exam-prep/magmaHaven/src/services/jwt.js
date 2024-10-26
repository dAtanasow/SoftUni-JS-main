const jwt = require('jsonwebtoken');

const secret = 'super s3cr3t'

function createToken(user) {
    const payload = {
        email: user.email,
        username: user.username,
        _id: user._id
    };

    const token = jwt.sign(payload, secret, {
        expiresIn: '1d'
    });

    return token;
};

function verifyToken(token) {
    const data = jwt.verify(token, secret);

    return data;
};


module.exports = { createToken, verifyToken }