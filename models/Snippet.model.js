const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

/**
 * @typedef {Object} Snippet
 * @property {sring} id
 * @property {string} author
 * @property {string} code
 * @property {sring} title
 * @property {string} author
 * @property {string} description
 * @property {string} language
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

// CREATE

exports.insert = async ({ author, code, title, description, language }) => {
  try {
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
    // read snippets.json
    // grab data
    // parse datat
    // write to the file
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    return fs.writeFile(dbpath, JSON.stringify(snippets));
  } catch (err) {
    console.log(err, 'ERROR from snippets');
    throw err;
  }
};
