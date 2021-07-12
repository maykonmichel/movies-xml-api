import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import express, {Application} from 'express';
import xml from 'xml';

bodyParserXml(bodyParser);

const app: Application = express();
const port = 3000;

app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async (req, res) => {
  res.type('application/xml');
  return res.status(200).send(
    xml({
      message: 'Hello World!',
    }),
  );
});

app.post('/', async (req, res) => {
  return res.status(200).send(
    xml({
      message: 'Hello World!',
    }),
  );
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
