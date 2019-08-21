/* eslint-disable camelcase */

const shortid = require('shortid');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils.js');
const ErrHTTP = require('../utils/ErrHTTP');

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} userName
 * @property {string} password
 * @property {string} confirmPassword
 * @property {string} pronoun
 * @property {string} location
 */

/**
 * Selects all the objects in the database.
 * Accepts optional query object to filter results.
 * @param {Object} [query]
 * @returns {Promise<[Object]>}
 */
exports.select = async (query = {}) => {
  try {
    const all_users = await readJsonFromDb('users');
    const filtered_users = all_users.filter(user =>
      Object.keys(query).every(key => query[key] === user[key])
    );
    return filtered_users;
  } catch (err) {
    throw new ErrHTTP('Database error');
  }
};

/**
 * Inserts a new user into the database.
 * @param {User} newUser Data to create user
 * @returns {Promise<Snippet>} Created user
 */
exports.insert = async ({
  firstName,
  lastName,
  email,
  userName,
  password,
  confirmPassword,
  pronoun,
  location,
}) => {
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !userName ||
      !password ||
      !confirmPassword ||
      !pronoun ||
      !location
    )
      throw new ErrHTTP('Invalid user properties', 400);
    const all_users = await readJsonFromDb('users');
    all_users.push({
      id: shortid.generate(),
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
      pronoun,
      location,
    });
    await writeJsonToDb('users', all_users);
    return all_users[all_users.length - 1];
  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('Database error');
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
