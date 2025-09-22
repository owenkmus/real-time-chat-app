const { User } = require('../models');
const jwtUtils = require('../utils/jwt.util.js');

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        const user = await User.create({ username, email, password_hash: password });
        
        const userJson = user.toJSON();
        delete userJson.password_hash;

        res.status(201).json({ message: 'User registered successfully', user: userJson });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwtUtils.generateAccessToken({ id: user.id });
        const refreshToken = jwtUtils.generateRefreshToken({ id: user.id });

        res.json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    try {
        const user = jwtUtils.verifyRefreshToken(token);
        const accessToken = jwtUtils.generateAccessToken({ id: user.id });
        res.json({ accessToken });
    } catch (err) {
        return res.sendStatus(403);
    }
};

module.exports = {
    register,
    login,
    refreshToken
};

