/* eslint-disable camelcase */

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
    console.log(new_user);
    return response.status(201).json(new_user);
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
exports.getUserById = async (request, response, next) => {
  try {
    console.log(request.params);
    const { userid } = request.params;
    const user = await Users.select({ userid });
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
