const fs = require('fs').promises;
const path = require('path');

/**
 * Read file from database
 * @param {object} fileName
 * @returns {object} A parsed JSON file of the passed file
 */
exports.readJsonFromDb = async fileName => {
  const dbpath = path.join(__dirname, '..', 'db', `${fileName}.json`);
  return JSON.parse(await fs.readFile(dbpath));
};

/**
 * Writes to a JSON file
 * @param {object} fileName
 * @param {object} data
 * @returns {object} stringified JSON object
 */
exports.writeJsonToDb = async (fileName, data) => {
  const dbpath = path.join(__dirname, '..', 'db', `${fileName}.json`);
  return fs.writeFile(dbpath, JSON.stringify(data));
};
