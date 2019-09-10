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
    const new_critique = await Critiques.insert(request.body);
    response.status(201).send(new_critique);
  } catch (err) {
    next(err);
  }
};

exports.getCritiqueByUsername = async (
  { params: { username } },
  response,
  next
) => {
  try {
    const critique = await Critique.select({ username });
    if (!critique.length) {
      throw new ErrHTTP('User does not exist', 404);
    }
    response.send(critique[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateCritique = async (requst, response, next) => {
  try {
    const updated_critique = await Critique.update(request.params, requst.body);
    response.send(updated_critique);
  } catch (err) {
    next(err);
  }
};

exports.deleteCritique = async ({ params: { id } }, response, next) => {
  try {
    await Critique.delete({ id });
    response.send(`Critique "${id}" deleted successfully`);
  } catch (err) {
    next(err);
  }
};
