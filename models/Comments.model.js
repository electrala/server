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
      `SELECT * FROM comments ${
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

exports.insert = async ({ username, comment }) => {
  try {
    console.log(username);
    console.log(comment);
    if (!username || !comment) throw new ErrHTTP('Missing properties', 400);
    const result = await db.query(
      `INSERT INTO comments (username, comment)
      VALUES ($1, $2)`,
      [username, comment]
    );
  } catch (err) {
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('database error');
  }
};

exports.update = async ({ id }, newData) => {
  console.log(id);
  console.log(newData.comment);
  try {
    const { comment } = newData;
    await db.query(
      `UPDATE comments 
       SET
         comment = COALESCE($2, comment)
       WHERE id = ($1)`,
      [id, comment]
    );
  } catch (err) {
    console.log(err.message);
    if (err instanceof ErrHTTP) throw err;
    else throw new ErrHTTP('Database Error');
  }
};
