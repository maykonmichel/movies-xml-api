import express from 'express';
import {Builder} from 'xml2js';
import {pool} from './database';

export const app = express();

const builder = new Builder({headless: true});

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
