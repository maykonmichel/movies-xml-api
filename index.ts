import 'reflect-metadata';
import {createConnection} from 'typeorm';

import {Actor} from './src/actors/actor';
import {app} from './src/app';

const port = 3000;

try {
  createConnection({
    type: 'mysql',
    url: process.env.CLEARDB_DATABASE_URL,
    entities: [Actor],
    logging: true,
    synchronize: true,
  }).then(() => {
    app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
    });
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
