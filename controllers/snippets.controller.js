const snippet = require('../models/Snippet.model');
const ErrorStatus = require('../utils/ErrHTTP');

exports.createSnippet = async (request, response) => {
  const Snippet = await snippet.insert(request.body);
  response.status(201).send(Snippet);
  console.log(request.body, 'recieved');
};

// the query is technically
exports.getSnippets = async ({ query }, response) => {
  const Snippets = await snippet.select(query);
  console.log(query);
  return response.send(Snippets);
};

exports.getSnippetById = async (request, response) => {
  try {
    const { id } = request.params;
    const Snippets = await snippet.select({ id });
    if (Snippets.length === 0) {
      throw new Error('id does not exist', 404);
    }
    response.send(Snippets[0]);
  } catch (err) {
    if (err instanceof ErrorStatus) response.status(404).end(Error);
  }
};
