const Snippet = require('./models/Snippet.model');

async function testModels() {
  //   const snippets = await Snippet.select({
  //     language: 'javascript',
  //     author: 'Scott',
  //   });
  //   console.log(snippets);

  try {
    const newSnip = await Snippet.insert({
      author: 'Chris',
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

testModels();
