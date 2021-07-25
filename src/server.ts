import {app} from './app';

const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error.message}`);
}
