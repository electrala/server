/* eslint-disable camelcase */

const shortid = require('shortid');
const bcrypt = require('bcrypt');
const format = require('pg-format');
const db = require('../db');

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
 * @param {Object} [query] User ID
 * @returns {Promise<[Object]>} A JSON object of all relevant users
 */
exports.select = async (query = {}) => {
  try {
    const selectUser = Object.keys(query)
      .map((key, i) => `%I=$${i + 1}`)
      .join(' AND ');
    const formattedSelect = format(
      `SELECT * FROM users ${selectUser.length ? `WHERE ${selectUser}` : ''}`,
      ...Object.keys(query)
    );
    // const all_users = await readJsonFromDb('users');
    // const filtered_users = all_users.filter(user =>
    //   Object.keys(query).every(key => query[key] === user[key])
    // );
    // return filtered_users;
    return selectUser;
  } catch (err) {
    throw new ErrHTTP('Database error');
  }
};

/**
 * Inserts a new user into the database.
 * @param {User} newUser Data to create user
 * @returns {Promise<Snippet>} A JSON object of the created user
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
    const hashedPassword = await bcrypt.hash(password, 2);
    await db.query(
      `INSERT INTO users (  
        firstName,
        lastName,
        email,
        userName,
        password,
        confirmPassword,
        pronoun,
        location)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        firstName,
        lastName,
        email,
        userName,
        hashedPassword,
        confirmPassword,
        pronoun,
        location,
      ]
    );
  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('Database error');
  }
};

/**
 * Updates a user in the database.
 * @param {string} id User ID
 * @param {User} newData Data to update user
 * @returns {User} A JSON object of the updated user
 * TODO: If given a new key, add it to the db
 */
exports.update = async (id, newData) => {
  // try {
  //   let updated_user = {};
  //   let id_found = false;

  //   const users = await readJsonFromDb('users');
  //   const updated_users = users.map(user => {
  //     if (user.id !== id) return user;
  //     Object.keys(newData).forEach(key => {
  //       if (key in user) user[key] = newData[key];
  //       else throw new ErrHTTP(`Key "${key}" does not exist`, 400);
  //     });
  //     updated_user = user;
  //     id_found = true;
  //     return user;
  //   });
  //   if (!id_found) {
  //     throw new ErrHTTP('ID does not exist', 404);
  //   }
  //   await writeJsonToDb('users', updated_users);
  //   return updated_user;
  // } 
  try {

  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('Database error');
  }
};

/**
 * Deletes a user in the database with matching id
 * @param {string} id user ID
 * @returns {User} A JSON object of the updated user
 */
exports.delete = async id => {
  try {
    // Read in the db file
    const users = await readJsonFromDb('users');
    // filter users for everything except user.id
    const filteredUsers = await users.filter(user => user.id !== id);
    if (filteredUsers.length === users.length)
      throw new ErrHTTP('User id not found', 404);
    return writeJsonToDb('users', filteredUsers);
  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('Database error');
  }
};
