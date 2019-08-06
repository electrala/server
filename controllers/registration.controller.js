const userRegistration = require('../models/userRegistration.model');
const ErrorStatus = require('../utils/ErrHTTP');

exports.createUser = async (request, response) => {
  const user = await userRegistration.insert(request.body);
  response.status(201).send(user);
  console.log(request.body, 'recieved');
};

// the query is technically
exports.getUsers = async ({ query }, response) => {
  const users = await userRegistration.select(query);
  return response.send(users);
};

exports.getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const users = await userRegistration.select({ id });
    if (users.length === 0) {
      throw new Error('id does not exist', 404);
    }
    response.send(users[0]);
  } catch (err) {
    if (err instanceof ErrorStatus) response.status(404).end(Error);
  }
};

exports.deleteUser = async (request, response) => {
  const { id } = request.params;
  await userRegistration.delete(id);

  // Add error to delete when the id isnt there anymore
  response.send(`deleted id: ${id}`);
};

exports.updateUser = async (request, response) => {
  // need to bring in body as an object
  const data = request.body;
  // destructuring the file
  const { id } = request.params;

  const users = await userRegistration.update(id, data);

  response.send(users);
};
