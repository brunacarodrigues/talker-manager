const { Router } = require('express');
const { readTalkerFile, writeTalker, editTalker } = require('../utils/fsUtils');
const { validName, validToken, validAge, validTalk,
        validTalkInfos, validRate, validId } = require('../middlewares');

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

talkerRouter.post('/', validToken, validName, validAge,
    validTalk, validTalkInfos, validRate, async (req, res) => {
    const talkers = await readTalkerFile();
    const newTalker = { id: talkers.length + 1, ...req.body };
    await writeTalker(newTalker);
    return res.status(201).json(newTalker);
});

talkerRouter.put('/:id',
  validToken, validName, validAge, validTalk,
  validTalkInfos, validId, validRate, async (req, res) => {
    const { id } = req.params;
    const talker = req.body;

    const updateTalker = await editTalker(id, talker);
    if (!updateTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } return res.status(200).json(updateTalker);
});

module.exports = { talkerRouter };