/* eslint-disable camelcase */

const Critiques = require('../models/Critiques.model');

const ErrHTTP = require('../utils/ErrHTTP');

exports.getCritiques = async (request, response, next) => {
  try {
    const all_critiques = await Critiques.select();
    return response.send(all_critiques);
  } catch (err) {
    next(err);
  }
};

exports.createCritique = async (request, response, next) => {
  try {
    // console.log(request);
    const new_critique = await Critiques.insert(request.body);
    response.send(new_critique);
  } catch (err) {
    next(err);
  }
};

// Get All critiques from a particular user
exports.getCritiqueByUsername = async (
  { params: { username } },
  response,
  next
) => {
  try {
    const critiques = await Critiques.select({ username });
    if (!critiques.length) {
      throw new ErrHTTP('User does not exist', 404);
    }
    console.log(critiques);
    response.send(critiques);
  } catch (err) {
    next(err);
  }
};

// Get critique by ID
exports.getCritiqueByID = async ({ params: { id } }, response, next) => {
  try {
    const critique = await Critiques.select({ id });
    if (!critique.length) {
      throw new ErrHTTP('User does not exist', 404);
    }
    console.log(critique);
    response.send(critique);
  } catch (err) {
    next(err);
  }
};

exports.updateCritique = async (request, response, next) => {
  try {
    const updated_critique = await Critiques.update(
      request.params,
      request.body
    );
    response.send(updated_critique);
  } catch (err) {
    next(err);
  }
};

exports.deleteCritique = async ({ params: { id } }, response, next) => {
  try {
    await Critiques.delete({ id });
    response.send(`Critique "${id}" deleted successfully`);
  } catch (err) {
    next(err);
  }
};
