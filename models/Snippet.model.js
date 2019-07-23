const fs = require('fs').promises;
const path = require('path');

/* Create */
/* Read */

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
