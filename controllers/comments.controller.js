/* eslint-disable camelcase */

const Comments = require('../models/Comments.model');

const ErrHTTP = require('../utils/ErrHTTP');

exports.getAllComments = async (request, response, next) => {
  try {
    const all_comments = await Comments.select();
    return response.send(all_comments);
  } catch (err) {
    next(err);
  }
};

exports.createComment = async (request, response, next) => {
  try {
    const new_comment = await Comments.insert(request.body);
    response.status(201).send(new_comment);
  } catch (err) {
    next(err);
  }
};

// Get All comments from a particular user
exports.getCommentsByUsername = async (
  { params: { username } },
  response,
  next
) => {
  try {
    const comments = await Comments.select({ username });
    if (!comments.length) {
      throw new ErrHTTP('User does not exist', 404);
    }
    console.log(comments);
    response.send(comments);
  } catch (err) {
    next(err);
  }
};

// Get comments by ID
exports.getCommentByID = async ({ params: { crit_id } }, response, next) => {
  try {
    const comments = await Comments.select({ crit_id });
    if (!comments.length) {
      throw new ErrHTTP('User does not exist', 404);
    }
    console.log(comments);
    response.send(comments);
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByCritiqueID = async (request, response, next) => {
  try {
    const commentsByCrit = await Comments.selectByCritID(request.params);
    response.send(commentsByCrit);
  } catch (error) {
    next(err);
  }
}

exports.updateComment = async (request, response, next) => {
  try {
    const updated_comment = await Comments.update(request.params, request.body);
    response.send(updated_comment);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async ({ params: { id } }, response, next) => {
  try {
    await Comments.delete({ id });
    response.send(`Comment "${id}" deleted successfully`);
  } catch (err) {
    next(err);
  }
};
