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
 * Add a new user to the database.
 * @param {object} response
 * @param {object} request
 * @param {object} next
 * @returns {object} A JSON object of the new user
 */
exports.createUser = async (request, response, next) => {
  try {
    const new_user = await Users.insert(request.body);
    response.status(201).send(new_user);
  } catch (err) {
    next(err);
  }
};

// GETS USER BY THEIR ID
exports.getUserById = async (request, response) => {
  try {
    // will grab the user by their ID
    const { id } = request.params;
    const users = await Users.select({ id });

    // checking if the user lenght is zero if so will throw an error
    if (users.length === 0) {
      throw new Error('id does not exist', 404);
    }
    response.send(users[0]);
  } catch (err) {
    if (err instanceof ErrorStatus) response.status(404).end(Error);
  }
};

/**
 * DELETE user by ID
 * @param {object} request
 * @param {object} response
 * @returns A JSON object with deleted user
 */
exports.deleteUser = async (request, response) => {
  // checking the user of ID
  const { id } = request.params;
  await Users.delete(id);

  // TODO: Add error to delete when the id isnt there anymore
  response.send(`deleted id: ${id}`);
};

// UPDATE user by their ID
// TODO: add try catch to see if the ID is real
exports.updateUser = async (request, response) => {
  // need to bring in body as an object
  const data = request.body;
  // destructuring the file
  const { id } = request.params;

  const users = await Users.update(id, data);

  response.send(users);
};
