const fs = require('fs').promises;
const path = require('path');

exports.readJsonFromDb = async fileName => {
  const dbpath = path.join(__dirname, '..', 'db', `${fileName}.json`);
  return JSON.parse(await fs.readFile(dbpath));
};

exports.writeJsonToDb = async (fileName, data) => {
  // where the file to
  const dbpath = path.join(__dirname, '..', 'db', `${fileName}.json`);
  return fs.writeFile(dbpath, JSON.stringify(data));
};
