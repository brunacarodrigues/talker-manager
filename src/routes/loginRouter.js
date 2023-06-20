const { Router } = require('express');
const crypto = require('crypto');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
});

module.exports = { loginRouter };