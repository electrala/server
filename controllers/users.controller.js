/* eslint-disable camelcase */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users.model');
const ErrHTTP = require('../utils/ErrHTTP');

/**
 * Gets all the users in the database
 * @param {object} response
 * @param {object} request
 * @param {object} next
 * @returns {object} A JSON object of all users
 */
exports.getUsers = async (request, response, next) => {
  try {
    const all_users = await Users.select();
    return response.send(all_users);
  } catch (err) {
    next(err);
  }
};

/**
 * Add a new user to the database
 * @param {object} response
 * @param {object} request
 * @param {object} next
 * @returns {object} A JSON object of the new user
 */
exports.createUser = async (request, response, next) => {
  try {
    const new_user = await Users.insert(request.body);
    return response.status(201).json(new_user);
  } catch (err) {
    next(err);
  }
};

/**
 * Logs a user in, returning their authenticaton token.
 * @param {object} response
 * @param {object} request
 * @param {object} next
 * @returns {oject} A message string and a JSON Web Token
 */
exports.logIn = async (request, response, next) => {
  try {
    const username = request.body.userName;
    const user = await Users.select(username);
    const payload = { name: user.name, id: user.id };
    if (!user) throw new ErrHTTP('This user does not exist.', 404);
    const isMatch = await bcrypt.compare(request.body.password, user.password);
    if (!isMatch) throw new ErrHTTP("This password doesn't match", 401);
    // We can place the whole object where the user.username if we needed to
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    response.send({ message: 'Logged in!', token });
  } catch (err) {
    next(err);
  }
};

/**
 * Selects a user given a unique ID
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object} A JSON object of the selected user
 */
exports.getUserById = async ({ params: { id } }, response, next) => {
  try {
    const user = await Users.select({ id });
    if (user.length === 0) {
      throw new ErrHTTP('ID does not exist', 404);
    }
    response.send(user[0]);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates a user given a unique ID & user data.
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object} A JSON object of the updated user
 */
exports.updateUser = async (request, response, next) => {
  try {
    const data = request.body;
    const { id } = request.params;
    const users = await Users.update(id, data);
    response.send(users);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE user by ID
 * @param {object} request
 * @param {object} response
 * @returns A JSON object with deleted user
 */
exports.deleteUser = async (request, response) => {
  const { id } = request.params;
  await Users.delete(id);
  response.send(`deleted id: ${id}`);
};
