const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const generateAccessToken = username => {
    return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = { generateAccessToken };
