DROP TABLE IF EXISTS critiques;
DROP TABLE IF EXISTS users;
CREATE TABLE critiques
(
  id SERIAL PRIMARY KEY,
  username TEXT,
  title TEXT,
  description TEXT,
  questions TEXT,
  genre TEXT,
  s3locationurl TEXT
);
CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  email TEXT,
  userName TEXT,
  password TEXT,
  confirmPassword TEXT,
  pronoun TEXT,
  location TEXT
)
