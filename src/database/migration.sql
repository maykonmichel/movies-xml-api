DROP TABLE IF EXISTS movies_cast;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS series_cast;
DROP TABLE IF EXISTS series;
DROP TABLE IF EXISTS actors;
DROP TABLE IF EXISTS directors;

CREATE TABLE actors
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE directors
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE movies
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(100),
    director INTEGER REFERENCES directors,
    year     INTEGER,
    rating   INTEGER
);

CREATE TABLE movies_cast
(
    id    SERIAL PRIMARY KEY,
    movie INTEGER REFERENCES movies,
    actor INTEGER REFERENCES actors
);

CREATE TABLE series
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(100),
    director INTEGER REFERENCES directors,
    year     INTEGER,
    rating   INTEGER,
    seasons  INTEGER
);

CREATE TABLE series_cast
(
    id    SERIAL PRIMARY KEY,
    serie INTEGER REFERENCES series,
    actor INTEGER REFERENCES actors
);
