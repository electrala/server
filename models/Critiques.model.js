const format = require('pg-format');
const db = require('../db');
const ErrHTTP = require('../utils/ErrHTTP');

// made a change to try and force a name change so the file updates in git.

exports.select = async (query = {}) => {
  try {
    const andClause = Object.keys(query)
      .map((_, i) => `%I = $${i + 1}`)
      .join(' AND ');

    const queryString = format(
      `SELECT * FROM critiques ${
        andClause.length ? `WHERE ${andClause}` : ''
      } ORDER BY id`,
      ...Object.keys(query)
    );
    const result = await db.query(queryString, Object.values(query));
    return result.rows;
  } catch (err) {
    console.error(err);
    throw new ErrHTTP('Database Error');
  }
};

exports.insert = async ({ username, title, description, genre, questions }) => {
  try {
    console.log(username);
    console.log(title);
    console.log(description);
    console.log(genre);
    console.log(questions);
    if (!username || !title || !description || !genre || !questions)
      throw new ErrHTTP('Missing properties', 400);
    await db.query(
      `INSERT INTO critiques (username, title, description, genre, questions)
      VALUES ($1, $2, $3, $4, $5)`,
      [username, title, description, genre, questions]
    );
  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('database error');
  }
};

exports.update = async ({ id }, newData) => {
  try {
    const { title, description, genre, questions } = newData;
    await db.query(
      `UPDATE critiques 
       SET
         title = COALESCE($2, title), 
         description = COALESCE($3, description), 
         genre = COALESCE($4, genre), 
         questions = COALESCE($5, questions)
       WHERE id = ($1)`,
      [id, title, description, genre, questions]
    );
  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('Database Error');
  }
};

exports.delete = async ({ id }) => {
  try {
    const result = await db.query(`DELETE FROM critiques WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      throw new ErrHTTP(`Critique @ id: ${id} does not exist`, 404);
    }
  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('database error');
  }
};
