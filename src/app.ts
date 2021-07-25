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
  pool.query('SELECT * FROM actor', (err, rows) => {
    res.send({Actors: {Actor: rows}});
  });
});

app.get('/actors/:id', async (req, res) => {
  pool.query(
    'SELECT * FROM actor WHERE id = ?',
    [req.params.id],
    (err, rows) => {
      console.log(err, rows);
      res.send({Actor: rows});
    },
  );
});

app.post('/actors', async (req, res) => {
  pool.query(
    'INSERT INTO actor VALUES (DEFAULT, ?, DEFAULT, DEFAULT)',
    req.body.input.name[0],
    () => {
      res.statusCode = 201;
      res.send({});
    },
  );
});

app.get('/directors', async (req, res) => {
  pool.query('SELECT * FROM director', (err, rows) => {
    res.send({Directors: {Director: rows}});
  });
});

app.get('/directors/:id', async (req, res) => {
  pool.query(
    'SELECT * FROM director WHERE id = ?',
    [req.params.id],
    (err, rows) => {
      console.log(err, rows);
      res.send({Director: rows});
    },
  );
});

app.post('/directors', async (req, res) => {
  pool.query(
    'INSERT INTO director VALUES (DEFAULT, ?, DEFAULT, DEFAULT)',
    req.body.input.name[0],
    () => {
      res.statusCode = 201;
      res.send({});
    },
  );
});

app.get('/movies', async (req, res) => {
  pool.query('SELECT * FROM movie', (err, rows) => {
    res.send({Movies: {Movie: rows}});
  });
});

app.get('/movies/:id', async (req, res) => {
  pool.query(
    'SELECT * FROM movie WHERE id = ?',
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
  } = req.body.input;
  pool.query(
    'INSERT INTO movie(name, year, rating) VALUES (?, ?, ?)',
    [name, year, rating],
    () => {
      res.statusCode = 201;
      res.send({});
    },
  );
});
