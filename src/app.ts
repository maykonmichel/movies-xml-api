import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import express from 'express';
import {Builder} from 'xml2js';

import {pool} from './database';

export const app = express();

bodyParserXml(bodyParser);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.xml());

const builder = new Builder();

app.use((req, res, next) => {
  const send = res.send;
  res.send = (data) => {
    res.type('application/xml');
    res.send = send;
    return res.send(builder.buildObject(data));
  };
  next();
});

app.get('/actors', async (req, res) => {
  pool.query('SELECT * FROM actors', (err, rows) => {
    res.send({Actors: {Actor: rows}});
  });
});

app.get('/actors/:id', async (req, res) => {
  pool.query(
    'SELECT * FROM actors WHERE id = ?',
    [req.params.id],
    (err, rows) => {
      console.log(err, rows);
      res.send({Actor: rows});
    },
  );
});

app.post('/actors', async (req, res) => {
  pool.query(
    'INSERT INTO actors(name) VALUES (?)',
    req.body.input.name[0],
    () => {
      res.statusCode = 201;
      res.send({});
    },
  );
});

app.get('/directors', async (req, res) => {
  pool.query('SELECT * FROM directors', (err, rows) => {
    res.send({Directors: {Director: rows}});
  });
});

app.get('/directors/:id', async (req, res) => {
  pool.query(
    'SELECT * FROM directors WHERE id = ?',
    [req.params.id],
    (err, rows) => {
      console.log(err, rows);
      res.send({Director: rows});
    },
  );
});

app.post('/directors', async (req, res) => {
  pool.query(
    'INSERT INTO directors(name) VALUES (?)',
    req.body.input.name[0],
    () => {
      res.statusCode = 201;
      res.send({});
    },
  );
});

app.get('/movies', async (req, res) => {
  pool.query('SELECT * FROM movies', (err, rows) => {
    res.send({Movies: {Movie: rows}});
  });
});

app.get('/movies/:id', async (req, res) => {
  pool.query(
    'SELECT * FROM movies WHERE id = ?',
    [req.params.id],
    (err, rows) => {
      console.log(err, rows);
      res.send({Movie: rows});
    },
  );
});

app.post('/movies', async (req, res) => {
  const {
    name: [name],
    year: [year],
    rating: [rating],
    director: [director],
  } = req.body.input;
  pool.query(
    'INSERT INTO movies(director, name, year, rating) VALUES (?, ?, ?, ?)',
    [director, name, year, rating],
    () => {
      res.statusCode = 201;
      res.send({});
    },
  );
});

app.get('/series', async (req, res) => {
  pool.query('SELECT * FROM series', (err, rows) => {
    res.send({Series: {Serie: rows}});
  });
});

app.get('/series/:id', async (req, res) => {
  pool.query(
    'SELECT * FROM series WHERE id = ?',
    [req.params.id],
    (err, rows) => {
      console.log(err, rows);
      res.send({Serie: rows});
    },
  );
});

app.post('/series', async (req, res) => {
  const {
    name: [name],
    year: [year],
    rating: [rating],
    director: [director],
    seasons: [seasons],
  } = req.body.input;
  pool.query(
    'INSERT INTO series(director, name, year, rating, seasons) VALUES (?, ?, ?, ?, ?)',
    [director, name, year, rating, seasons],
    () => {
      res.statusCode = 201;
      res.send({});
    },
  );
});
