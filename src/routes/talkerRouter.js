const { Router } = require('express');
const { readTalkerFile, writeTalker } = require('../utils/fsUtils');
const { validEmail, validPass } = require('../middlewares');

const talkerRouter = Router();

talkerRouter.get('/', async (req, res) => {
    const talkers = await readTalkerFile();
    return res.status(200).json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
    const talkers = await readTalkerFile();
    const talker = talkers.find((e) => e.id === Number(req.params.id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
});

talkerRouter.post('/', validEmail, validPass, async (req, res) => {
    const talkers = await readTalkerFile();
    const newTalker = { id: talkers.length + 1, ...req.body };
    await writeTalker(newTalker);
    return res.status(201).json(newTalker);
});

module.exports = { talkerRouter };