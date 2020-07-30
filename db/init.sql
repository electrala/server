DROP TABLE IF EXISTS critiques;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS comments;
CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  email TEXT,
  userName TEXT UNIQUE,
  password TEXT,
  pronoun TEXT,
  location TEXT,
  userImageS3Location TEXT
);
CREATE TABLE critiques
(
  id SERIAL PRIMARY KEY,
  username TEXT REFERENCES users(userName),
  title TEXT,
  description TEXT,
  questions TEXT,
  genre TEXT,
  s3locationurl TEXT
);
CREATE TABLE comments
(
  id SERIAL PRIMARY KEY,
  crit_id INTEGER REFERENCES critiques(id),
  username TEXT REFERENCES users(userName),
  comment TEXT,
  post_time TIMESTAMP
);