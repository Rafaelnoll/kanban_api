CREATE DATABASE kanban;

CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE IF NOT EXISTS users(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_V4(),
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  description VARCHAR,
  password VARCHAR NOT NULL,
  image_path VARCHAR,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categories(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_V4(),
  name VARCHAR NOT NULL,
  user_id UUID NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tasks(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_V4(),
  title VARCHAR NOT NULL,
  status VARCHAR NOT NULL CHECK (status IN ('DO', 'DOING', 'DONE')),
  description VARCHAR,
  category_id UUID,
  user_id UUID NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
