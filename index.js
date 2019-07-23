const Snippet = require('./models/Snippet.model');

async function testModels() {
  //   const snippets = await Snippet.select({
  //     language: 'javascript',
  //     author: 'Scott',
  //   });
  //   console.log(snippets);

  try {
    await Snippet.insert({
      author: 'Ayana',
      code: 'code, code, code',
      title: 'Ayana is the best',
      description: 'Ayana got is ssss',
      language: 'javacript',
    });
  } catch (err) {
    console.log(err);
  }
}

testModels();
