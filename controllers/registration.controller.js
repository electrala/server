const userRegistration = require('../models/registration.model');
const ErrorStatus = require('../utils/ErrHTTP');

// CREATES USER
exports.createUser = async (request, response) => {
  // sending a request to server
  // user registration is grabbing the path
  const user = await userRegistration.insert(request.body);
  // sending the response back to the user
  response.status(201).send(user);
  console.log(request.body, 'recieved');
};

// the query is technically
exports.getUsers = async ({ query }, response) => {
  const users = await userRegistration.select(query);
  return response.send(users);
};

// GETS USER BY THEIR ID
exports.getUserById = async (request, response) => {
  try {
    // will grab the user by their ID
    const { id } = request.params;
    const users = await userRegistration.select({ id });

    // checking if the user lenght is zero if so will throw an error
    if (users.length === 0) {
      throw new Error('id does not exist', 404);
    }
    response.send(users[0]);
  } catch (err) {
    if (err instanceof ErrorStatus) response.status(404).end(Error);
  }
};

// DELETE user by ID
exports.deleteUser = async (request, response) => {
  // checking the user of ID
  const { id } = request.params;
  await userRegistration.delete(id);

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

  const users = await userRegistration.update(id, data);

  response.send(users);
};
