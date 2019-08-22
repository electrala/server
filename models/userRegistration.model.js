const shortid = require('shortid');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils.js');

/**
 * @typedef {Object} user
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
    const users = await readJsonFromDb('users');
    const filtered = users.filter(user =>
      Object.keys(query).every(key => query[key] === user[key])
    );

    return filtered;
  } catch (err) {
    console.log('ERROR in users');
    throw err;
  }
};

// CREATE

exports.insert = async ({ firstName, lastName, email, city, state, field }) => {
  try {
    if (!firstName || !lastName || !email || !city || !field)
      throw Error('Missing property');
    const users = await readJsonFromDb('users');

    // read user.json
    // grab data
    // parse datat
    // write to the file
    users.push({
      id: shortid.generate(),
      firstName,
      lastName,
      email,
      city,
      state,
      field,
    });

    await writeJsonToDb('users', users);
    return users[users.length[-1]];
  } catch (err) {
    console.log(err, 'ERROR from user database');
    throw err;
  }
};

// DELETE
exports.delete = async id => {
  // Read in the db file
  const users = await readJsonFromDb('users');
  // filter users for everything except user.id
  const filteredUsers = await users.filter(user => user.id !== id);
  // write the file
  // comapring the filtered user id not tth
  if (filteredUsers.length === users.length) return;
  return writeJsonToDb('users', filteredUsers);
};

/**
 * @param {string} if-id of the user to update
 * @param {user} newData-subset of value
 * TODO: FYI if given a new key it will add it to the db
 */

// UPDATE
exports.update = async (id, newData) => {
  // read in file
  const users = await readJsonFromDb('users');
  // map holds key values
  const updateUsers = users.map(user => {
    // if it is not the id I want, just return it.
    if (user.id !== id) return user;
    // new obj generates a new array
    Object.keys(newData).forEach(key => {
      // checking if newData has a key
      if (key in user) user[key] = newData;
      user[key] = newData[key];
    });
    return user;
  });
  return writeJsonToDb('users', updateUsers);

  // find the entry with id
};
