const fs = require('fs').promises;
const path = require('path');

/**
 * @typedef {Object} Snippet
 * @property {sring} id
 * @property {string} author
 * @property {string} code
 * @property {sring} id
 * @property {string} author
 * @property {string} comments
 * @property {number} favorites
 */

/** Read
 *Select a number from db.
 *can accept optional query object to filter results
 * @param {Object} [query]
 * @returns {Promise<[Object]>}
 */

exports.select = async (query = {}) => {
  try {
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );

    return filtered;
  } catch (err) {
    console.log('ERROR in Snippet');
    throw err;
  }
};
