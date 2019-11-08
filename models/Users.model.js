/* eslint-disable camelcase */

const bcrypt = require('bcrypt');
const format = require('pg-format');
const db = require('../db');

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
    if (typeof query === 'string') {
      const queryString = `SELECT * from users WHERE username = $1`;
      const param = query;
      const result = await db.query(queryString, [param]);
      return result.rows[0];
    }
    const selectUser = Object.keys(query)
      .map((key, i) => `%I=$${i + 1}`)
      .join(' AND ');
    const formattedSelect = format(
      `SELECT * FROM users ${selectUser.length ? `WHERE ${selectUser}` : ''}`,
      ...Object.keys(query)
    );
    const results = await db.query(formattedSelect, Object.values(query));
    return results.rows;
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
      !pronoun ||
      !location
    )
      throw new ErrHTTP('Invalid user properties', 400);
    const hashedPassword = await bcrypt.hash(password, 2);
    const result = await db.query(
      `INSERT INTO users (  
        firstName,
        lastName,
        email,
        userName,
        password,
        pronoun,
        location)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [firstName, lastName, email, userName, hashedPassword, pronoun, location]
    );
    return result.rows[0];
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
    const { firstName, lastName, email, username, pronoun, location, userImageS3Location } = newData;
    await db.query(
      `UPDATE users
      SET
        firstName = COALESCE($2, firstName),
        lastName = COALESCE($3, lastName),
        email = COALESCE($4, email),
        username = COALESCE($5, username),
        pronoun = COALESCE($6, pronoun),
        location = COALESCE($7, location),
        userImageS3Location = COALESCE($8, userImageS3Location)
      WHERE id = ($1)`,
      [id, firstName, lastName, email, username, pronoun, location, userImageS3Location]
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
