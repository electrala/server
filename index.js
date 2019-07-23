const Snippet = require('./models/Snippet.model');

async function testModels() {
  const snippets = await Snippet.select({
    language: 'javascript',
    author: 'Scott',
  });
  console.log(snippets);
}

testModels();
