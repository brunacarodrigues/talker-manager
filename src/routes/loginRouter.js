const { Router } = require('express');
const crypto = require('crypto');
const { validEmail, validPass } = require('../middlewares');

const loginRouter = Router();

loginRouter.post('/', validEmail, validPass, (req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
});

module.exports = { loginRouter };