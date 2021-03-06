CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  nickname TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP
);
CREATE TABLE t (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  modified TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL
);