const validEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailFail = 'O campo "email" é obrigatório';
    const emailFormat = 'O "email" deve ter o formato "email@email.com"';
    if (!email) return res.status(400).json({ message: emailFail });
    if (!email.match(regex)) return res.status(400).json({ message: emailFormat });
    next();
};

const validPass = (req, res, next) => {
    const { password } = req.body;
    const passFail = 'O campo "password" é obrigatório';
    const passMinChars = 'O "password" deve ter pelo menos 6 caracteres';
    if (!password) return res.status(400).json({ message: passFail });
    if (password.length < 6) return res.status(400).json({ message: passMinChars });
    next();
};

module.exports = {
    validEmail,
    validPass,
};
