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
  try {
    if (!id) throw new ErrHTTP('Missing id', 400);
    const { firstName, lastName, email, username, pronoun, location } = newData;
    await db.query(
      `UPDATE users
      SET
        firstName = COALESCE($2, firstName),
        lastName = COALESCE($3, lastName),
        email = COALESCE($4, email),
        username = COALESCE($5, username),
        pronoun = COALESCE($6, pronoun),
        location = COALESCE($7, location)
      WHERE id = ($1)`,
      [id, firstName, lastName, email, username, pronoun, location]
    );
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
    const result = await db.query(`DELETE FROM users WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      throw new ErrHTTP(`User @ id: ${id} does not exist`, 401);
    }
  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('Database error');
  }
};
