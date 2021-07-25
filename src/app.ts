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

app.use((req, res, next) => {
  const send = res.send;
  res.send = (data) => {
    res.type('application/xml');
    res.send = send;
    try {
      return res.send(Parser.parse(JSON.parse(data)));
    } catch {
      return res.send(data);
    }
  };
  next();
});

RegisterRoutes(app);

app.use(
  (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void => {
    res.type('application/xml');

    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      return res.status(500).send(
        Parser.parse({
          message: 'Internal Server Error',
        }),
      );
    }

    next();
  },
);
