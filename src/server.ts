import 'reflect-metadata';
import {createConnection} from 'typeorm';

import {Actor} from './actors/actor';
import {Director} from './directors/director';
import {app} from './app';

const PORT = process.env.PORT || 3000;

try {
  createConnection({
    type: 'mysql',
    url: process.env.CLEARDB_DATABASE_URL,
    entities: [Actor, Director],
    logging: true,
    synchronize: true,
  }).then(() => {
    app.listen(PORT, (): void => {
      console.log(`Connected successfully on port ${PORT}`);
    });
  });
} catch (error) {
  console.error(`Error occurred: ${error.message}`);
}
