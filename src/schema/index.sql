CREATE DATABASE kanban;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_V4(),
  name VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tasks(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_V4(),
  title VARCHAR NOT NULL,
  description VARCHAR,
  category_id UUID,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
