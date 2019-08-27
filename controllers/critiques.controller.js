const critiqueRegistration = require('../models/critiqueRegistration.model');
const ErrorStatus = require('../utils/ErrHTTP');

// CREATES CRITIQUE
exports.createCritique = async (request, response) => {
  // sending a request to server
  // critique registration is grabbing the path
  const critique = await critiqueRegistration.insert(request.body);
  // sending the response back to the user
  response.status(201).send(critique);
  console.log(request.body, 'recieved');
};

// the query is technically
exports.getCritiques = async ({ query }, response) => {
  const critiques = await critiqueRegistration.select(query);
  return response.send(critiques);
};

// GETS CRITIQUE BY THEIR ID
exports.getCritiqueById = async (request, response) => {
  try {
    // will grab the critique by their ID
    const { id } = request.params;
    const critiques = await critiqueRegistration.select({ id });

    // checking if the critique length is zero if so will throw an error
    if (critiques.length === 0) {
      throw new Error('id does not exist', 404);
    }
    response.send(critiques[0]);
  } catch (err) {
    if (err instanceof ErrorStatus) response.status(404).end(Error);
  }
};

// GETS CRITIQUE BY THEIR TITLE
exports.getCritiqueByTitle = async (request, response) => {
  try {
    // This grabs the critique by title
    const { title } = request.params;
    const critiques = await critiqueRegistration.select({ title });

    // checking if the critique length is 0 ie they don't enter anything
    if (critiques.length === 0) {
      throw new Error('Title does not exist', 404);
    }
    response.send(critiques[0]);
  } catch (err) {
    if (err instanceof ErrorStatus) response.status(400).end(Error);
  }
};

// GET CRITIQUE BY THEIR GENRE
exports.getCritiqueByGenre = async (request, response) => {
  try {
    // This grabs the critique by genre
    const { genre } = request.params;
    const critiques = await critiqueRegistration.select({ genre });

    // checking if the critique length is 0 ie they don't enter anything
    if (critiques.length === 0) {
      throw new Error('genre does not exist', 404);
    }
    response.send(critiques[0]);
  } catch (err) {
    if (err instanceof ErrorStatus) response.status(400).end(Error);
  }
};

// DELETE critique by ID
exports.deleteCritique = async (request, response) => {
  // checking the critique of ID
  const { id } = request.params;
  await critiqueRegistration.delete(id);

  // TODO: Add error to delete when the id isnt there anymore
  response.send(`deleted id: ${id}`);
};

// UPDATE critique by their ID
// TODO: add try catch to see if the ID is real
exports.updateCritique = async (request, response) => {
  // need to bring in body as an object
  const data = request.body;
  // destructuring the file
  const { id } = request.params;

  const critiques = await critiqueRegistration.update(id, data);

  response.send(critiques);
};
