import 'reflect-metadata';
import {createConnection} from 'typeorm';

import {Actor} from './actors/actor';
import {app} from './app';

const PORT = process.env.PORT || 3000;

try {
  createConnection({
    type: 'mysql',
    url: process.env.CLEARDB_DATABASE_URL,
    entities: [Actor],
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
