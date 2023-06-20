const fs = require('fs').promises;
const path = require('path');

const TALKERFILE = path.resolve(__dirname, '../talker.json');

const readTalkerFile = async () => {
    const file = await fs.readFile(TALKERFILE, 'utf-8');
    const talkers = JSON.parse(file);
    return talkers;
};

const writeTalker = async (talker) => {
    const file = await fs.readFile(TALKERFILE, 'utf-8');
    const talkers = JSON.parse(file);
    talkers.push(talker);
    await fs.writeFile(TALKERFILE, JSON.stringify(talkers, null, 2));
};

module.exports = {
    readTalkerFile,
    writeTalker,
};