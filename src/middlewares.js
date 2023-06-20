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

const validToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });
    if (token.length !== 16 || typeof token !== 'string') {
        return res.status(401)
            .json({ message: 'Token inválido' });
    }
    next();
};

const validName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18 || !Number.isInteger(Number(age))) {
        return res.status(400)
        .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    next();
};

const validTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
  };
  
  const validTalkInfos = (req, res, next) => {
      const { talk: { watchedAt } } = req.body;
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
      }
      if (!regex.test(watchedAt)) {
        const message = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
          return res.status(400).json({ message });
      }
      next();
    };
  
    const validRate = (req, res, next) => {
      const { rate } = req.body.talk;
      if (+rate < 1 || +rate > 5) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
      }
      if (!rate) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' }); 
      }
      if (!Number.isInteger(Number(rate))) {
        return res.status(400)
          .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
      }
        next();
    };

module.exports = {
    validEmail,
    validPass,
    validToken,
    validName,
    validAge,
    validTalk,
    validTalkInfos,
    validRate,
};
