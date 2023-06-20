const fs = require('fs').promises;
const path = require('path');

const TALKERFILE = path.resolve(__dirname, '../talker.json');

const readTalkerFile = async () => {
    console.log('talkerFile', TALKERFILE);
    const file = await fs.readFile(TALKERFILE, 'utf-8');
    // console.log('readfile', file);
    const talkers = JSON.parse(file);
    return talkers;
};

const writeTalker = async (talker) => {
    const file = await fs.readFile(TALKERFILE, 'utf-8');
    const talkers = JSON.parse(file);
    talkers.push(talker);
    await fs.writeFile(TALKERFILE, JSON.stringify(talkers, null, 2));
};

const editTalker = async (id, talker) => {
    const talkers = await readTalkerFile();
    const talkerIndex = talkers.findIndex((el) => el.id === Number(id));
    if (talkerIndex !== -1) {
        console.log('index edit', talkerIndex);
      talkers[talkerIndex] = { id: Number(id), ...talker };
    }
    await fs.writeFile(TALKERFILE, JSON.stringify(talkers, null, 2));
    return talkers[talkerIndex];
  };

  const deleteTalker = async (id) => {
    const talkers = await readTalkerFile();
    const talkerIndex = talkers.findIndex((el) => el.id === Number(id));
    talkers.splice(talkerIndex, 1);
    await fs.writeFile(TALKERFILE, JSON.stringify(talkers));
  };

  const updateTalker = async (id, rate) => {
    const talkers = await readTalkerFile();
    const update = talkers.find((el) => el.id === +id);
    update.talk.rate = rate;
    await fs.writeFile(TALKERFILE, JSON.stringify(talkers, null, 2));
  };

module.exports = {
    readTalkerFile,
    writeTalker,
    editTalker,
    deleteTalker,
    updateTalker,
};