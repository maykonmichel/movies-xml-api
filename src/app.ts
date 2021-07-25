import express from 'express';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';

import {RegisterRoutes} from '../build/routes';

bodyParserXml(bodyParser);

export const app = express();

app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({extended: true}));

RegisterRoutes(app);
