const Snippet = require('./models/Snippet.model');

async function testModels() {
  //   const snippets = await Snippet.select({
  //     language: 'javascript',
  //     author: 'Scott',
  //   });
  //   console.log(snippets);

  try {
    const newSnip = await Snippet.insert({
      author: 'Chrigjkgs',
      code: 'code, code, code',
      title: 'Ayana is the best',
      description: 'Ayana got is ssss',
      language: 'javacript',
    });
    console.log(newSnip);
  } catch (err) {
    console.log(err);
  }
}

async function testSnippetsSelect() {
  const snippets = await Snippet.select();
  console.log(snippets);
}

async function testSnippetsInsert() {
  const snippets = await Snippet.insert();
  console.log(snippets);
}

async function testDelete(id) {
  const snippets = await Snippet.delete(id);
  console.log(snippets);
}

testModels();
// testSnippetsInsert();
