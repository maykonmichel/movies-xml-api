import {ValidateError} from '@tsoa/runtime';
import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import {j2xParser} from 'fast-xml-parser';

const Parser = new j2xParser({});

import {RegisterRoutes} from '../build/routes';

bodyParserXml(bodyParser);

export const app = express();

app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({extended: true}));

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  res.type('application/xml');

  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).send(
      Parser.parse({
        message: 'Validation Failed',
        details: err?.fields,
      }),
    );
  }
  if (err instanceof Error) {
    return res.status(500).send(
      Parser.parse({
        message: 'Internal Server Error',
      }),
    );
  }

  next();
});
