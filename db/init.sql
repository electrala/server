<<<<<<< HEAD
CREATE TABLE critiques
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    title TEXT,
    description TEXT,
    questions TEXT,
    genre TEXT,
    comments TEXT
    []);

=======
DROP TABLE IF EXISTS critiques;
DROP TABLE IF EXISTS users;
CREATE TABLE critiques (
  id SERIAL PRIMARY KEY,
  username TEXT,
  title TEXT,
  description TEXT,
  questions TEXT,
  genre TEXT,
  comments TEXT []
);
CREATE TABLE users (
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
>>>>>>> 312475f9d8841615e7c5994b54b7501959d0e6a9
